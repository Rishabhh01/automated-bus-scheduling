🚍 Automated Bus Scheduling 
An Automated Bus Scheduling  to streamline and optimize bus scheduling and driver management using MERN stack.

This system aims to improve operational efficiency by automating bus and driver scheduling while providing a dedicated portal for drivers to check their assigned routes and duties.


/Automated-Bus-Scheduling-System
│
├── /admin-portal             # Admin Portal - Manage scheduling, routes, and drivers
│
├── /dashboard-sidebar        # Driver Portal - View assignments and profile
│
├── /backend  # Backend (Node.js + Express.js + MongoDB)

✨ Features
🛑 Admin Portal (React.js)
Add, edit, delete drivers and buses.
Create and manage routes.
Schedule buses and assign drivers automatically using an ML algorithm.
Monitor driver availability and bus usage.
Interactive UI for smooth scheduling.

✅ Driver Portal (React.js)
Login securely to access assigned bus and route details.
View upcoming assignments and duty schedules.
Update availability status (Available/Not Available).
Note: Driver Portal is in progress and will be enhanced

🗄️ Backend (Node.js, Express.js, MongoDB)
RESTful APIs to handle CRUD operations.
Integration with MongoDB for data storage (drivers, buses, routes, schedules).
Authentication and authorization for admin and drivers.
Connected with ML algorithm for auto-scheduling drivers and buses.

🔑 Setup and Installation
1. Clone the repository
git clone <repo url>
2. Navigate to each folder and install dependencies
*Admin Portal
cd admin-portal
npm install
npm start
*Driver Dashboard
cd dashboard-sidebar
npm install
npm start
*Backend
cd driver-management-backend
npm install
npm run server


📊 Database Schema

Driver Model
Name
License Number
Password
Experience
Preferred Shift (Morning, Afternoon, Evening)
Region (North, East, West, South)
Routes Covered
Hours Driven
Availability (Available/Not Available)
Assignments

Bus Model
Bus Number
Route
Shift
Region
Route Difficulty

⚙️ Machine Learning Integration (Optional)
Takes available buses and drivers.
Matches them based on constraints (region, shift, experience, availability).
Returns optimized scheduling which is stored in MongoDB and shown in Admin Portal.

📈 Future Scope
Real-time tracking of buses and drivers.
SMS/Email notification to drivers for assignments.
Integration of traffic data for route optimization.
Advanced ML algorithms for better scheduling efficiency.

📬 Contact
Developed by: Rishabh Chauhan
📧 Email: [rishabhc2234@gmail.com]
