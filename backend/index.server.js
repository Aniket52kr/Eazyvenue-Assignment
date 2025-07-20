const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
const dealerAuthRoutes = require('./routes/dealer.auth');
const clientAuthRoutes = require('./routes/client.auth');
const venueRoutes = require('./routes/venue');
const dealsRoutes = require('./routes/deal');

// API route prefixes
app.use('/api/dealer', dealerAuthRoutes);
app.use('/api/client', clientAuthRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/deals', dealsRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Connect to MongoDB
const connectDB = async () => {
  const dbUrl = process.env.dburl;
  if (!dbUrl) {
    console.error("❌ Database URL not provided. Add 'dburl' in your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(dbUrl);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 2000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

start();
