const express = require("express");
const Vendor = require("../models/Vendor");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {

    if (
  !req.body.vendorName ||
  !req.body.companyName ||
  !req.body.vendorState ||
  !req.body.vendorCity ||
  !req.body.vendorAddress ||
  !req.body.productDescription
) {
  return res.status(400).json({
    message: "Required fields missing",
  });
}


    const newEntry = new Vendor({
  vendorName: req.body.vendorName,
  companyName: req.body.companyName,
  vendorState: req.body.vendorState,
  vendorCity: req.body.vendorCity,
  vendorAddress: req.body.vendorAddress,
  productDescription: req.body.productDescription,

  otherAreaName: req.body.otherAreaName || undefined,
  gstNumber: req.body.gstNumber || undefined,
  phone: req.body.phone || undefined,
  email: req.body.email || undefined,
  priceRange: req.body.priceRange || undefined,
  visitingCardImageUrl: req.body.visitingCardImageUrl || undefined,
  productImageUrl: req.body.productImageUrl || undefined,
});


    await newEntry.save();
    res.json({ message: "Vendor entry created successfully", data: newEntry });
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ message: "Failed to create entry" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const entries = await Vendor.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const entry = await Vendor.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    res.json(entry);
  } catch (error) {
    console.error("Error fetching entry:", error);
    res.status(500).json({ message: "Failed to fetch entry" });
  }
});


router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Vendor.findByIdAndUpdate(
  req.params.id,
  {
    $set: {
      ...req.body,
      visitingCardImageUrl: req.body.visitingCardImageUrl || undefined,
      productImageUrl: req.body.productImageUrl || undefined,
    }
  },
  { new: true }
);


    if (!updated) return res.status(404).json({ message: "Entry not found" });

    res.json({ message: "Vendor entry updated", data: updated });
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).json({ message: "Failed to update entry" });
  }
});


router.delete("/:id", auth, async (req, res) => {
  try {
    const removed = await Vendor.findByIdAndDelete(req.params.id);

    if (!removed) return res.status(404).json({ message: "Entry not found" });

    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ message: "Failed to delete entry" });
  }
});

module.exports = router;