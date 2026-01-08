require("dotenv").config();
const mongoose = require("mongoose");
const Vendor = require("./models/Vendor");

const runMigration = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected");
    const count = await Vendor.countDocuments({
      $or: [
        { phone: { $exists: true } },
        { email: { $exists: true } }
      ]
    });

    console.log(`📊 Records to migrate: ${count}`);

    if (count === 0) {
      console.log("🎉 No records need migration");
      process.exit(0);
    }

    const result = await Vendor.updateMany(
      {
        $or: [
          { phone: { $exists: true } },
          { email: { $exists: true } }
        ]
      },
      [
        {
          $set: {
            phones: {
              $cond: [
                { $and: [{ $ne: ["$phone", null] }, { $ne: ["$phone", ""] }] },
                ["$phone"],
                [],
              ],
            },
            emails: {
              $cond: [
                { $and: [{ $ne: ["$email", null] }, { $ne: ["$email", ""] }] },
                ["$email"],
                [],
              ],
            },
          },
        },
        {
          $unset: ["phone", "email"],
        },
      ]
    );

    console.log("✅ Migration completed");
    console.log("🧾 Result:", result);

    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
};

runMigration();
