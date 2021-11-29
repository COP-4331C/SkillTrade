const util = require("util");
const aws = require("aws-sdk");
const multer = require("multer");
const crypto = require("crypto");
const sharp = require("sharp");

const maxSize = 5 * 1024 * 1024; // Max upload size of 5MB (it will be reduced by sharp)

aws.config.update({ region: "us-east-2" });

s3 = new aws.S3();

const uploadParams = (directory, fileName, fileBuffer) => {
  return {
    Bucket: `skilltrade-bucket/${directory}`,
    Key: fileName,
    Body: fileBuffer,
  };
};

let uploadFileToS3 = async (req, res) => {
  let file = req.file;
  var validExtensions = [".png", ".jpg", ".jpeg", ".tiff", ".bmp", ".jfif"];

  let isValidExtension = false;
  for (var ext of validExtensions)
    if (file.originalname.toLowerCase().endsWith(ext)) isValidExtension = true;

  if (!isValidExtension) {
    req.file = null;
    return;
  }

  var newFileName = crypto.randomBytes(20).toString("hex") + ".jpg";

  let imageBuffer = await sharp(req.file.buffer)
    .resize(1024, null, {
      withoutEnlargement: true,
    })
    .jpeg({ quality: 90 })
    .toBuffer();

  await s3
    .upload(uploadParams(req.directory, newFileName, imageBuffer))
    .promise()
    .then((data) => {
      req.file = data;
    })
    .catch((err) => {
      req.file = null;
    });
};

let multerFile = multer({
  // storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

exports.multerFile = util.promisify(multerFile);
exports.uploadFileToS3 = uploadFileToS3;
