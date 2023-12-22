// Importing the mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Load environment variables from .env file
require("dotenv").config();

// Create MongoDB URI with authentication and database details
const MONGO_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.b02wbxn.mongodb.net/digicert`;

// Defining an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {

    // Attempt to establish a connection to MongoDB database with specified options
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,        // Use the new URL parser
      useUnifiedTopology: true,     // Use the new Server Discovery and Monitoring engine
    });

    // Logging a success message if the connection is established
    console.log('MongoDB connected successfully');
    
  } catch (error) {
    // Logging an error message if the connection fails
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Exporting the connectDB function to use it in the other parts of the application
module.exports = connectDB;
