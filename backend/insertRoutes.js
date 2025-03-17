const mongoose = require('mongoose');
const Route = require('./models/route'); // Ensure you have Route model

const MONGO_URI = 'mongodb+srv://rishabhc2234:YY1tuSakOPHjI5Ht@cluster0.l0rqn.mongodb.net/driverManagement';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');

  const routes = [
    { number: "2" },
    { number: "3" },
    { number: "4" },
    { number: "5" },
    { number: "6" },
    { number: "7" },
    { number: "8" },
    { number: "9" },
    { number: "10" },
    { number: "11" },
    { number: "12" },
    { number: "13" },
    { number: "14" },
    { number: "15" },
    { number: "16" },
    { number: "17" },
    { number: "18" },
    { number: "19" },
    { number: "20" },
    { number: "21" },
    { number: "22" },
    // Add other routes as necessary
  ];

  Route.insertMany(routes)
    .then(() => {
      console.log('Routes added successfully');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error adding routes:', err);
      mongoose.connection.close();
    });

}).catch(err => console.error('❌ MongoDB connection error:', err));
