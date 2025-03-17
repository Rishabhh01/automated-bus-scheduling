import sys
import json
import random

def assign_drivers_to_buses(drivers, buses):
    available_drivers = [driver for driver in drivers if driver['availability']]
    available_buses = [bus for bus in buses if bus['availability']]

    random.shuffle(available_drivers)
    random.shuffle(available_buses)

    assignments = []
    unassigned_drivers = []
    unassigned_buses = available_buses.copy()

    used_buses = set()
    aged_drivers_assigned = set()

    for driver in available_drivers:
        driver_age = driver['age']
        driver_experience = driver['experience']
        driver_region = driver['region']
        driver_shift = driver['preferredShift']

        best_match = None
        best_score = -1

        for bus in available_buses:
            if bus['_id'] in used_buses:
                continue

            bus_region = bus['region']
            bus_shift = bus['shift']
            route_difficulty = bus['routeDifficulty']

            if driver_age > 40 and route_difficulty == 3:
                continue
            if driver_age <= 40 and route_difficulty == 3 and driver_experience < 3:
                continue
            if driver_age > 40 and driver['_id'] in aged_drivers_assigned:
                continue

            score = 0
            if driver_region == bus_region:
                score += 5
            if driver_shift == bus_shift:
                score += 5
            score += driver_experience * 2

            if route_difficulty == 3 and driver_age <= 40 and driver_experience < 3:
                score -= 5

            if score > best_score:
                best_score = score
                best_match = bus

        if best_match:
            assignments.append({
                'driver': driver['name'],
                'bus_number': best_match['number']
            })
            used_buses.add(best_match['_id'])

            if driver_age > 40:
                aged_drivers_assigned.add(driver['_id'])

            if best_match in unassigned_buses:
                unassigned_buses.remove(best_match)
        else:
            unassigned_drivers.append(driver['name'])

    unassigned_buses_numbers = [bus['number'] for bus in unassigned_buses]

    return {
        'assignments': assignments,
        'unassignedDrivers': unassigned_drivers,
        'unassignedBuses': unassigned_buses_numbers
    }


if __name__ == "__main__":
    try:
        input_data = sys.stdin.read()
        if not input_data.strip():
            raise ValueError("No input received from backend")

        data = json.loads(input_data)
        drivers = data['drivers']
        buses = data['buses']

        result = assign_drivers_to_buses(drivers, buses)
        print(json.dumps(result))  # Output the result to backend

    except Exception as e:
        print(json.dumps({'error': str(e)}))  # Print error in JSON format
