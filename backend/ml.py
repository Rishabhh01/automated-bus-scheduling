import numpy as np
import pandas as pd
from pymongo import MongoClient
from scipy.optimize import linear_sum_assignment
import json

# ----------------- MongoDB Fetch Function -----------------

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

# ----------------- MongoDB Connection -----------------

mongo_uri = 'mongodb+srv://rishabhc2234:YY1tuSakOPHjI5Ht@cluster0.l0rqn.mongodb.net/driverManagement'
db_name = 'driverManagement'
drivers_collection = 'drivers'
buses_collection = 'buses'

# ----------------- Fetch Data -----------------

projection_drivers = {'name': 1, 'availability': 1, 'preferredShift': 1, 'region': 1, 'experience': 1, 'hoursDriven': 1, 'age': 1}
drivers = get_mongo_data(mongo_uri, db_name, drivers_collection, {'availability': True}, projection_drivers)

projection_buses = {'number': 1, 'shift': 1, 'region': 1, 'routeDifficulty': 1, 'totalStops': 1}
buses = get_mongo_data(mongo_uri, db_name, buses_collection, {'availability': True}, projection_buses)

# ----------------- Validation -----------------

if drivers.empty or buses.empty:
    result = {"error": "Drivers or buses data is empty"}
    print(json.dumps(result))
    exit(1)

# ----------------- Logical Cost Matrix Construction -----------------

num_drivers = len(drivers)
num_buses = len(buses)
cost_matrix = np.zeros((num_drivers, num_buses))

for i, driver in drivers.iterrows():
    for j, bus in buses.iterrows():
        cost = 0
        
        # ---------- Region Matching ----------
        region_match = 0 if driver['region'] == bus['region'] else 1  # prefer matching regions
        cost += region_match * 10  # High penalty if region mismatches

        # ---------- Shift Matching ----------
        shift_match = 0 if driver['preferredShift'] == bus['shift'] else 1
        cost += shift_match * 8  # High penalty for shift mismatch

        # ---------- Experience vs Route Difficulty ----------
        if driver['experience'] >= bus['routeDifficulty']:
            experience_penalty = 0  # Good match
        else:
            experience_penalty = (bus['routeDifficulty'] - driver['experience']) * 5  # Penalty if less experienced
        cost += experience_penalty

        # ---------- Age vs Total Stops ----------
        # Older drivers should be assigned to buses with fewer stops
        age_factor = (driver['age'] / 100)  # Normalize age
        stop_penalty = age_factor * bus['totalStops']  # More stops are harder for older drivers
        cost += stop_penalty

        # ---------- Hours Driven (Fatigue factor) ----------
        fatigue_penalty = driver['hoursDriven'] * 0.5  # Higher hours driven, more tired, light penalty
        cost += fatigue_penalty

        # ---------- Total Cost ----------
        cost_matrix[i, j] = cost

# ----------------- Hungarian Algorithm -----------------

driver_indices, bus_indices = linear_sum_assignment(cost_matrix)

# ----------------- Prepare Final Results -----------------

assignments = []
unassigned_drivers = set(range(num_drivers))
unassigned_buses = set(range(num_buses))

for driver_idx, bus_idx in zip(driver_indices, bus_indices):
    if bus_idx in unassigned_buses:
        assignments.append((drivers.iloc[driver_idx]['name'], buses.iloc[bus_idx]['number']))
        unassigned_drivers.discard(driver_idx)
        unassigned_buses.discard(bus_idx)

# ----------------- Unassigned Lists -----------------

unassigned_drivers_list = [drivers.iloc[i]['name'] for i in unassigned_drivers]
unassigned_buses_list = [buses.iloc[i]['number'] for i in unassigned_buses]

# ----------------- Output -----------------

result = {
    "assignments": [{"driver": driver_name, "bus": bus_number} for driver_name, bus_number in assignments],
    "unassigned_drivers": unassigned_drivers_list,
    "unassigned_buses": unassigned_buses_list
}

print(json.dumps(result))