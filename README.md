🚍 Automated Bus Scheduling
An AI-powered automated bus scheduling system designed to optimize driver assignments and streamline bus scheduling using the MERN stack (MongoDB, Express.js, React.js, Node.js).
This system improves operational efficiency by automating scheduling and providing a dedicated admin portal for managing drivers, buses, and assignments.
📁 Project Structur
/Automated-Bus-Scheduling-System  
│ ├── /admin-portal     # Admin Portal - Manage scheduling, routes, and drivers  
│ ├── /backend          # Backend (Node.js + Express.js + MongoDB)  

✨ Features

🛑 Admin Portal (React.js)
✔ Add, edit, delete drivers and buses
✔ Create & manage routes
✔ Automated scheduling using Machine Learning (Hungarian Algorithm + Random Forest model)
✔ Monitor driver availability & bus usage
✔ Interactive UI for efficient scheduling

🗄️ Backend (Node.js, Express.js, MongoDB)
✔ RESTful APIs to handle CRUD operations
✔ MongoDB integration for drivers, buses, routes & schedules
✔ Authentication & authorization for admins & drivers
✔ Connected with ML-powered auto-scheduling system

🔑 Setup and Installation
Follow these steps to set up and run the project locally:
🚀 Clone the Repository
git clone https://github.com/Rishabhh01/automated-bus-scheduling.git

📁 Navigate to the Project Directo
cd automated-bus-scheduling

🔧 Install Dependencies & Run Each Module
✅ Admin Portal (React.js) — For Admin Scheduling & Route Management
cd admin-portal  
npm install  # Install dependencies  
npm start    # Start the admin portal on localhost  

✅ Backend (Node.js + Express.js + MongoDB) — API & Database Handling
cd backend  
npm install  # Install backend dependencies  
npm run server  # Start the backend server (typically on port 5000)  

📊 Database Schema

Driver Model
🧑‍💼 Name
🪪 License Number
🔐 Password (securely hashed)
🛣️ Experience (in years)
🕒 Preferred Shift (Morning / Afternoon / Evening)
🗺️ Region (North / East / West / South)
🛤️ Routes Covered
⏱️ Hours Driven
✅❌ Availability (Available / Not Available)
📋 Assignments

Bus Model
🔢 Bus Number
🗺️ Route
🕒 Shift (Morning / Afternoon / Evening)
🏙️ Region (North / East / West / South)
⚙️ Route Difficulty (Easy / Moderate / Hard)

⚙️ Machine Learning Integration

This project incorporates Machine Learning-enhanced scheduling with optimization techniques to efficiently assign drivers to buses while maintaining constraints such as shift preferences, fatigue management, experience levels, and route difficulty.
How It Works:
✅ Fetches available drivers & buses from MongoDB, filtering only those marked as available.
✅ Uses Machine Learning (Random Forest model) trained on historical scheduling data to generate a weighted cost matrix, prioritizing efficient driver-bus assignments.
✅ Constructs a Cost Matrix, dynamically adjusting penalties based on fatigue, shift mismatches, experience gaps, and regional constraints using ML predictions.
✅ Applies Hungarian Algorithm to determine the mathematically optimal assignments, ensuring balanced and efficient scheduling.
✅ Outputs optimized scheduling, storing results in MongoDB and reflecting them in the Admin Portal for seamless management.

Technologies Used:
🧠 Random Forest Classifier → Trained on past scheduling data to refine cost weight calculations, improving selection accuracy.
📊 Cost Matrix Optimization → Weights are dynamically adjusted using ML-generated predictions rather than static penalties.
🔢 Hungarian Algorithm (scipy.optimize.linear_sum_assignment) → Performs final optimization, ensuring best possible driver-bus pairing.
💾 MongoDB Storage → Retains historical schedules to continuously refine future assignment strategies.

Why ML + Optimization Is Used:
✔ Ensures mathematically optimal assignments → Hungarian Algorithm guarantees best matches for drivers and buses.
✔ Incorporates adaptive learning → ML refines penalty weights for fatigue, shift mismatches, and difficulty levels over time.
✔ Balances automation with real-world constraints → Prevents driver fatigue, prioritizes shift preferences, and assigns experienced drivers to complex routes.


📈 Future Scope
🚀 Development of a Driver Portal for route assignments, availability updates, and schedules.
📩 SMS/Email notifications for driver assignments
🛣 Integration of traffic data for route optimization
🧠 Advanced ML models for better scheduling efficienc

📬 Contact
Developed by: Rishabh Chauhan
📧 Email: rishabhc2234@gmail.com




