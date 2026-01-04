const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
  {
    vendorName: { type: String, required: true },
    companyName: { type: String, required: true },
    vendorState: { type: String, required: true },
    vendorCity: { type: String, required: true },
    vendorAddress: { type: String, required: true },
    productDescription: { type: String, required: true },
    otherAreaName: { type: String }, 

    gstNumber: { type: String },
    phone: { type: String },
    email: { type: String },

    priceRange: { type: String },
    visitingCardImageUrl: { type: String },
    productImageUrl: { type: String },

    createdAt: { type: Date, default: Date.now },
  },
  { strict: true }
);
module.exports = mongoose.model("Vendor", VendorSchema);