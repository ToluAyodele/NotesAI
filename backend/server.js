const express = require('express');
require('dotenv').config(); // Ensure this is at the top
const chatbotRoutes = require('./routes/chatbot');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const cors = require('cors');


const app = express();

// Middlewares
app.use(cors());  // To handle CORS issues
app.use(express.json()); // To parse JSON requests

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api', noteRoutes); // Notes routes
app.use('/api', chatbotRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
