const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);


connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:8080",
    "http://13.233.194.64"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/vendors", require("./routes/vendorRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/categories", require("./routes/productCategoryRoutes"));





// Health check endpoint (to verify server works)
app.get("/", (req, res) => {
  res.send("Vendor Portal Backend Running Successfully 🚀");
});




// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
