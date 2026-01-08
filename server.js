const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

connectDB();

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/vendors", require("./routes/vendorRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
//app.use("/api/categories", require("./routes/productCategoryRoutes"));
app.use("/api/location", require("./routes/locationRoutes"));

// Health check endpoint (to verify server works)
app.get("/", (req, res) => {
  res.send("Vendor Portal Backend Running Successfully 🚀");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
