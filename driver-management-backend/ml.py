import numpy as np
import pandas as pd
from pymongo import MongoClient
from scipy.optimize import linear_sum_assignment
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from joblib import Parallel, delayed
import json

# MongoDB connection
def get_mongo_data(uri, db_name, collection_name, query={}, projection=None):
    try:
        client = MongoClient(uri)
        db = client[db_name]
        collection = db[collection_name]
        data = list(collection.find(query, projection))
        client.close()
        return pd.DataFrame(data)
    except Exception as e:
        result = {"error": f"Data fetch error: {str(e)}"}
        print(json.dumps(result))
        exit(1)

# MongoDB URI and database details
mongo_uri = 'mongodb+srv://rishabhc2234:YY1tuSakOPHjI5Ht@cluster0.l0rqn.mongodb.net/driverManagement'
db_name = 'driverManagement'
drivers_collection = 'drivers'
buses_collection = 'buses'

# Fetch data from MongoDB with optimized queries and projections
projection = {'Name': 1, 'availability': 1, 'Preferred Shift': 1, 'Region': 1, 'Experience': 1, 'Hours Driven': 1, 'PerformanceScore': 1}
drivers = get_mongo_data(mongo_uri, db_name, drivers_collection, {'availability': True}, projection)
buses = get_mongo_data(mongo_uri, db_name, buses_collection, {'availability': True}, {'number': 1, 'shift': 1, 'region': 1, 'routeDifficulty': 1})

# Feature engineering
def feature_vector(driver, bus):
    try:
        shift_match = 1 if driver['Preferred Shift'] == bus['shift'] else 0
        region_match = 1 if driver['Region'] == bus['region'] else 0
        experience_factor = driver['Experience'] * bus['routeDifficulty']
        rest_factor = 1 / (driver['Hours Driven'] + 1)
        return np.array([shift_match, region_match, experience_factor, rest_factor])
    except KeyError as e:
        return np.zeros(4)  # Return a zero vector if there's an error

# Parallel processing for feature vector calculation
def get_feature_vectors(driver, buses):
    return [feature_vector(driver, bus) for _, bus in buses.iterrows()]

num_cores = -1  # Use all available cores
X_train = Parallel(n_jobs=num_cores)(delayed(get_feature_vectors)(driver, buses) for _, driver in drivers.iterrows())

# Flatten the list
X_train = [item for sublist in X_train for item in sublist]

# Create y_train in parallel
y_train = Parallel(n_jobs=num_cores)(delayed(lambda driver: [driver.get('PerformanceScore', 0)] * len(buses))(driver) for _, driver in drivers.iterrows())

# Flatten the list
y_train = [item for sublist in y_train for item in sublist]

X_train = np.array(X_train)
y_train = np.array(y_train)

# Standardize features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# Train a machine learning model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Predict suitability scores
num_drivers = len(drivers)
num_buses = len(buses)
cost_matrix = np.zeros((num_drivers, num_buses))

for i in range(num_drivers):
    for j in range(num_buses):
        feature_vec = feature_vector(drivers.iloc[i], buses.iloc[j])
        feature_vec_scaled = scaler.transform([feature_vec])
        prediction = model.predict(feature_vec_scaled)
        if prediction.size > 0:  # Ensure the prediction has elements
            cost_matrix[i, j] = prediction[0]

# Convert cost matrix to a minimization problem for the Hungarian algorithm
cost_matrix = -cost_matrix  # We negate it because Hungarian algorithm minimizes the cost

# Apply the Hungarian algorithm
driver_indices, bus_indices = linear_sum_assignment(cost_matrix)

# Prepare assignments and tracking
assignments = []
unassigned_drivers = set(range(num_drivers))
unassigned_buses = set(range(num_buses))

for driver_index, bus_index in zip(driver_indices, bus_indices):
    if bus_index in unassigned_buses:
        assignments.append((drivers.iloc[driver_index]['Name'], buses.iloc[bus_index]['number']))
        unassigned_drivers.discard(driver_index)
        unassigned_buses.discard(bus_index)

# List unassigned drivers
unassigned_drivers_list = [drivers.iloc[i]['Name'] for i in unassigned_drivers]

# Prepare JSON result
result = {
    "assignments": [{"driver": driver_name, "bus": bus_number} for driver_name, bus_number in assignments],
    "unassigned_drivers": unassigned_drivers_list,
    "unassigned_buses": [buses.iloc[i]['number'] for i in unassigned_buses]
}

# Print JSON result
print(json.dumps(result))
