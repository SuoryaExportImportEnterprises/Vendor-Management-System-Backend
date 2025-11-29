// const express = require("express");
// const Vendor = require("../models/Vendor");
// const auth = require("../middleware/auth");

// const router = express.Router();

// /**
//  * CREATE vendor entry
//  */
// router.post("/", auth, async (req, res) => {
//   try {
//     const newVendor = new Vendor(req.body);
//     await newVendor.save();
//     res.json({ message: "Vendor entry created", vendor: newVendor });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// /**
//  * GET all vendor entries
//  */
// router.get("/", auth, async (req, res) => {
//   try {
//     const vendors = await Vendor.find().sort({ createdAt: -1 });
//     res.json(vendors);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// /**
//  * GET single vendor entry
//  */
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.params.id);
//     res.json(vendor);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// /**
//  * UPDATE vendor entry
//  */
// router.put("/:id", auth, async (req, res) => {
//   try {
//     const updated = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json({ message: "Vendor updated", vendor: updated });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// /**
//  * DELETE vendor entry
//  */
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     await Vendor.findByIdAndDelete(req.params.id);
//     res.json({ message: "Vendor deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;





























const express = require("express");
const Vendor = require("../models/Vendor");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * CREATE NEW VENDOR ENTRY
 */
router.post("/", auth, async (req, res) => {
  try {
    const newEntry = new Vendor({
  vendorName: req.body.vendorName,
  companyName: req.body.companyName,
  vendorState: req.body.vendorState,
  vendorCity: req.body.vendorCity,
  otherAreaName: req.body.otherAreaName || "",
  vendorAddress: req.body.vendorAddress,
  gstNumber: req.body.gstNumber,
  phone: req.body.phone,
  email: req.body.email,
  productCategory: req.body.productCategory,
  productDescription: req.body.productDescription,
  priceRange: req.body.priceRange,
  keywords: req.body.keywords,
  visitingCardImageUrl: req.body.visitingCardImageUrl,   // new
  productImageUrl: req.body.productImageUrl,             // new
});

    await newEntry.save();
    res.json({ message: "Vendor entry created successfully", data: newEntry });
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ message: "Failed to create entry" });
  }
});

/**
 * GET ALL VENDOR ENTRIES
 */
router.get("/", auth, async (req, res) => {
  try {
    const entries = await Vendor.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
});

/**
 * GET A SINGLE ENTRY BY ID
 */
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

/**
 * UPDATE ENTRY BY ID
 */
router.put("/:id", auth, async (req, res) => {
  try {
    // const updated = await Vendor.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   { new: true }
    // );

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

/**
 * DELETE ENTRY BY ID
 */
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
