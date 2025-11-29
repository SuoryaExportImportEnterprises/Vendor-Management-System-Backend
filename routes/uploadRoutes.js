// const express = require("express");
// const multer = require("multer");
// const uploadToS3 = require("../utils/uploadToS3");

// const router = express.Router();

// // multer memory storage
// const upload = multer({ storage: multer.memoryStorage() });

// router.post("/upload-image", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     const imageUrl = await uploadToS3(req.file.buffer, req.file.mimetype);

//     res.json({ imageUrl });
//   } catch (err) {
//     console.error("S3 upload error:", err);
//     res.status(500).json({ message: "Upload failed" });
//   }
// });

// module.exports = router;






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
