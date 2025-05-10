import numpy as np
import pandas as pd
import os
import json
import logging
from pymongo import MongoClient
from scipy.optimize import linear_sum_assignment
from dotenv import load_dotenv
from pymongo.errors import ConnectionFailure
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

# ----------------- Load Environment Variables -----------------
# Fetch MongoDB URI from environment variables securely
load_dotenv()
mongo_uri = os.getenv("MONGO_URI")

# ----------------- Logger Setup -----------------
# Logging configuration for tracking errors and debugging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# ----------------- MongoDB Fetch Function -----------------
def get_mongo_data(uri, db_name, collection_name, query={}, projection=None):
    """ Fetch data from MongoDB and return it as a pandas DataFrame """
    try:
        client = MongoClient(uri, serverSelectionTimeoutMS=5000)
        client.admin.command('ping')  # Test connection
        db = client[db_name]
        collection = db[collection_name]
        data = list(collection.find(query, projection))  # Convert MongoDB query results to list
        client.close()
        return pd.DataFrame(data)  # Convert list to DataFrame for easier processing
    except ConnectionFailure:
        logging.error("MongoDB connection failed")
        print(json.dumps({"error": "MongoDB connection failed"}))
        exit(1)
    except Exception as e:
        logging.error(f"Data fetch error: {str(e)}")
        print(json.dumps({"error": f"Data fetch error: {str(e)}"}))
        exit(1)

# ----------------- MongoDB Connection -----------------
db_name = 'driverManagement'
drivers_collection = 'drivers'
buses_collection = 'buses'
history_collection = 'scheduling_history'  # Store past scheduling data for ML training

# ----------------- Fetch Data from MongoDB -----------------
# Retrieve available drivers and buses for scheduling
projection_drivers = {'name': 1, 'availability': 1, 'preferredShift': 1, 'region': 1, 'experience': 1, 'hoursDriven': 1, 'age': 1}
drivers = get_mongo_data(mongo_uri, db_name, drivers_collection, {'availability': True}, projection_drivers)

projection_buses = {'number': 1, 'shift': 1, 'region': 1, 'routeDifficulty': 1, 'totalStops': 1}
buses = get_mongo_data(mongo_uri, db_name, buses_collection, {'availability': True}, projection_buses)

# Retrieve past scheduling data for ML training
past_schedules = get_mongo_data(mongo_uri, db_name, history_collection)

# ----------------- Validation -----------------
# If there are no available drivers or buses, return an error
if drivers.empty or buses.empty:
    logging.warning("Drivers or buses data is empty")
    result = {"error": "Drivers or buses data is empty"}
    print(json.dumps(result))
    exit(1)

# ----------------- ML Model Training -----------------
# If past scheduling data exists, train a Random Forest model for predicting driver-bus suitability
if not past_schedules.empty:
    feature_columns = ['experience', 'hoursDriven', 'age', 'routeDifficulty', 'totalStops']
    X_train = past_schedules[feature_columns]  # Extract feature set
    y_train = past_schedules['successful_assignment']  # Target label (1 = Success, 0 = Failed)

    # Standardize feature values to improve ML performance
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)

    # Train Random Forest model
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_train_scaled, y_train)
    logging.info("✅ ML model trained successfully using past scheduling data")

# ----------------- Cost Matrix Construction -----------------
# Build a cost matrix where lower values indicate better driver-bus matches
num_drivers = len(drivers)
num_buses = len(buses)
cost_matrix = np.zeros((num_drivers, num_buses))

for i, driver in drivers.iterrows():
    for j, bus in buses.iterrows():
        cost = 0
        
        # ---------- ML Predictions for Optimization ----------
        # Generate prediction-based weight for driver-bus compatibility
        feature_vector = np.array([[driver['experience'], driver['hoursDriven'], driver['age'], bus['routeDifficulty'], bus['totalStops']]])
        feature_scaled = scaler.transform(feature_vector) if not past_schedules.empty else feature_vector
        ml_score = rf_model.predict_proba(feature_scaled)[0][1] if not past_schedules.empty else 0.5  # Probability of success
        cost -= ml_score * 10  # Favor high-success predictions

        # ---------- Region Matching ----------
        # Penalize mismatches between driver's region and bus's region
        region_match = 0 if driver['region'] == bus['region'] else 1  
        cost += region_match * 10  

        # ---------- Shift Matching ----------
        # Penalize mismatches between driver's preferred shift and bus shift
        shift_match = 0 if driver['preferredShift'] == bus['shift'] else 1
        cost += shift_match * 8  

        # ---------- Experience vs Route Difficulty ----------
        # Penalize drivers with less experience for difficult routes
        experience_penalty = max(0, (bus['routeDifficulty'] - driver['experience']) * 5)  
        cost += experience_penalty

        # ---------- Age vs Total Stops ----------
        # Older drivers should preferably get buses with fewer stops
        age_factor = (driver['age'] / 100)  
        stop_penalty = age_factor * bus['totalStops']  
        cost += stop_penalty

        # ---------- Hours Driven (Fatigue factor) ----------
        # Penalize drivers who have driven for long hours recently
        fatigue_penalty = driver['hoursDriven'] * 0.5  
        cost += fatigue_penalty

        # ---------- Total Cost ----------
        # Lower cost means a better match
        cost_matrix[i, j] = cost

# ----------------- Hungarian Algorithm -----------------
# Apply Hungarian Algorithm to find optimal driver-bus assignments
driver_indices, bus_indices = linear_sum_assignment(cost_matrix)

# ----------------- Prepare Final Results -----------------
assignments = []
unassigned_drivers = set(range(num_drivers))
unassigned_buses = set(range(num_buses))

for driver_idx, bus_idx in zip(driver_indices, bus_indices):
    if bus_idx in unassigned_buses:
        assignments.append({"driver": drivers.iloc[driver_idx]['name'], "bus": buses.iloc[bus_idx]['number']})
        unassigned_drivers.discard(driver_idx)
        unassigned_buses.discard(bus_idx)

# ----------------- Unassigned Lists -----------------
# Gather unassigned drivers and buses
unassigned_drivers_list = [drivers.iloc[i]['name'] for i in unassigned_drivers]
unassigned_buses_list = [buses.iloc[i]['number'] for i in unassigned_buses]

# ----------------- Output -----------------
# Return final JSON response to the backend
result = {
    "assignments": assignments,
    "unassigned_drivers": unassigned_drivers_list,
    "unassigned_buses": unassigned_buses_list
}

logging.info("✅ Scheduling process completed successfully")
print(json.dumps(result))