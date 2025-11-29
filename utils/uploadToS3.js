// const s3 = require("../config/s3");
// const { v4: uuidv4 } = require("uuid");

// async function uploadToS3(buffer, mimeType) {
//   const fileKey = `${uuidv4()}.jpg`;

//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET,
//     Key: fileKey,
//     Body: buffer,
//     ContentType: mimeType,
//     ACL: "public-read"
//   };

//   const upload = await s3.upload(params).promise();
//   return upload.Location;
// }

// module.exports = uploadToS3;





// const AWS = require("aws-sdk");

// const uuidv4 = async () => {
//   const mod = await import("uuid");
//   return mod.v4();
// };

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: process.env.AWS_REGION,
// });

// const s3 = new AWS.S3();

// exports.uploadToS3 = async (file) => {
//   const id = await uuidv4();

//   const params = {
//     Bucket: process.env.AWS_BUCKET,
//     Key: `uploads/${id}-${file.originalname}`,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//     ACL: "public-read",
//   };

//   return s3.upload(params).promise();
// };







// const AWS = require("aws-sdk");

// const uuidv4 = async () => {
//   const mod = await import("uuid");
//   return mod.v4();
// };

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: process.env.AWS_REGION,
// });

// // IMPORTANT FIX — USE SIGNATURE VERSION V4
// const s3 = new AWS.S3({
//   signatureVersion: "v4",
// });

//   console.log("DEBUG BUCKET =", process.env.AWS_BUCKET);

// exports.uploadToS3 = async (file) => {
//   const id = await uuidv4();

//   const params = {
//     Bucket: process.env.AWS_BUCKET,
//     // Key: `uploads/${id}-${file.originalname}`,
//     Key: `${process.env.AWS_BUCKET_FOLDER}/${id}-${file.originalname}`,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//     //ACL: "public-read",
//   };


//   return s3.upload(params).promise();
// };















const AWS = require("aws-sdk");

const uuidv4 = async () => {
  const mod = await import("uuid");
  return mod.v4();
};

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

// Required for S3 public access-disabled buckets
const s3 = new AWS.S3({ signatureVersion: "v4" });

console.log("DEBUG BUCKET =", process.env.AWS_BUCKET);

exports.uploadToS3 = async (file) => {
  const id = await uuidv4();

  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${process.env.AWS_BUCKET_FOLDER}/${id}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};
