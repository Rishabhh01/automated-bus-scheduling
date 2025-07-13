## Automated Bus Scheduling System

An AI-powered bus scheduling system built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) designed to optimize driver-bus assignments through intelligent scheduling. The platform includes a modern **Admin Portal** for managing buses, drivers, and routes, and integrates **Machine Learning (Random Forest + Hungarian Algorithm)** for operational efficiency.

---

## 📁 Project Structure
```
/Automated-Bus-Scheduling-System
│
├── admin-portal/ # React.js frontend for admin (scheduling, routes, driver management)
├── backend/ # Node.js + Express backend API + MongoDB + ML integration
```
---

## Features

### Admin Portal (React.js)
- ✔ Add, edit, and delete drivers and buses
- ✔ Create & manage routes
- ✔ View optimized schedules
- ✔ Automated scheduling via integrated ML engine
- ✔ Track driver availability and shift preferences
- ✔ Responsive and interactive UI

### Backend (Node.js + Express.js + MongoDB)
- ✔ RESTful API for buses, drivers, routes, schedules
- ✔ MongoDB integration for data persistence
- ✔ Authentication & role-based access
- ✔ ML-powered optimization engine (Python-based)

---

##  Machine Learning Integration

The system uses ML + combinatorial optimization to assign drivers to buses effectively:

- **Random Forest Classifier**  
  Predicts penalties based on driver fatigue, route difficulty, and shift mismatches.

- **Cost Matrix Generation**  
  Dynamically weighted using ML outputs for each driver-bus pair.

- **Hungarian Algorithm**  
  Finds the most optimal (lowest cost) driver-bus assignment.

- **MongoDB Storage**  
  Saves historical scheduling data to retrain and refine the ML model over time.

---

## Setup and Installation

### Clone the Repository

```bash
git clone https://github.com/Rishabhh01/automated-bus-scheduling.git
cd automated-bus-scheduling
```
---
## Install & Run Modules
Admin Portal (React.js)
```bash
cd admin-portal
npm install
npm start     # Runs on http://localhost:3000
````
---
Backend (Node.js + Express + MongoDB)
```bash
cd backend
npm install
npm run server  # Runs on http://localhost:5000
```
---
##  Database Models

### Driver Schema

- **Name**
- **License Number**
- **Password** *(securely hashed)*
- **Experience** *(in years)*
- **Preferred Shift** *(Morning / Afternoon / Evening)*
- **Region** *(North / East / West / South)*
- **Routes Covered**
- **Hours Driven**
- **Availability** *(✔ Available / ❌ Not Available)*

### Bus Schema

- **Bus Number**
- **Assigned Route**
- **Shift** *(Morning / Afternoon / Evening)*
- **Region** *(North / East / West / South)*
- **Route Difficulty** *(Easy / Moderate / Hard)*

---

## ML + Optimization Pipeline

1. **Filter Available Drivers & Buses** from the database.
2. **Generate Cost Matrix** using predictions from the trained ML model.
3. **Apply Hungarian Algorithm** to determine optimal driver-bus assignments.
4. **Store Final Assignments** into MongoDB.
5. **Display Results** in the Admin Portal for review and confirmation.

---

##  Why ML + Hungarian?

- **Learns from historical data** to improve future predictions.
- **Guarantees optimal assignment** using the Hungarian Algorithm.
- **Accounts for real-world constraints** like driver fatigue, shift preferences, and route difficulty.
- **Continuously improves** with adaptive learning and scheduling data feedback.

---

## Future Scope

- **Driver Portal** for viewing assigned routes and updating availability.
- **SMS/Email notifications** for scheduled assignments.
- **Traffic data integration** to improve route accuracy and efficiency.
- **Advanced ML models** such as XGBoost, LightGBM, or Neural Networks for improved scheduling logic.
- **Mobile App for Drivers** for real-time access to routes and schedules.

---
## Author
**Rishabh Chauhan**  
Email: rishabhc2234@gmail.com




