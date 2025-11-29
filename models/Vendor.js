const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
  {
    vendorName: { type: String, required: true },
    companyName: { type: String, required: true },
    vendorState: { type: String, required: true },
    vendorCity: { type: String, required: true },
    otherAreaName: { type: String },  // only when city = "Other"
    vendorAddress: { type: String, required: true },
    gstNumber: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },

    productCategory: { type: String, required: true },
    productDescription: { type: String, required: true },
    priceRange: { type: String, required: true },
    keywords: { type: String, required: true },

    visitingCardImageUrl: { type: String, required: true },
    productImageUrl: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
  },
  { strict: true }
);

module.exports = mongoose.model("Vendor", VendorSchema);
