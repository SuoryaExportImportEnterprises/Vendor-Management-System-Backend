const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);


// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Later we will add: auth routes, admin routes, vendor routes, etc.
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
