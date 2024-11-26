const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://deshmukhsoham2865:Soham1545@cluster0.freol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  score: Number,
});

const User = mongoose.model("User", userSchema);

// API endpoint to get leaderboard data
app.get("/api/leaderboard", async (req, res) => {
  try {
    // Fetch users sorted by score in descending order
    const users = await User.find().sort({ score: -1 });
    console.log("Users fetched:", users);  // Debugging line
    res.json(users);  // Return the sorted users in response
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard data" });
  }
});


// Start server
app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}`));
