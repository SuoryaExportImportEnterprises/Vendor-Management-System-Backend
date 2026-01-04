const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const { uploadToS3 } = require("../utils/uploadToS3");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});


router.post("/image", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const result = await uploadToS3(req.file);

    return res.json({ imageUrl: result.Location });
  } catch (err) {
    console.error("S3 Upload Error:", err);
    res.status(500).json({ message: "Image upload failed" });
  }
});

module.exports = router;
