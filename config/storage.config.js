const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const httpError = require("http-errors");

//For Storing Products Images
const ProductStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/data/uploads/products");
  },
  filename: function (req, file, callback) {
    callback(null, uuidv4() + "-" + path.extname(file.originalname));
  },
});

//Multer Configuration for uploading User Profiles
const ProductUpload = multer({
  storage: ProductStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new httpError(422, {
          message: "'Only .png, .jpg and .jpeg format allowed!'",
        })
      );
    }
  },
});

//exporting
module.exports = {
  ProductUpload,
};
