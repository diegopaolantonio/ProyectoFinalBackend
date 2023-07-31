import multer from "multer";
import __dirname from "../dirname.js";

export function uploadDocuments(files) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/public/documents`);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const uploader = multer({ storage }).fields([
    { name: "identificacion" },
    { name: "domicilio" },
    { name: "cuenta" },
  ]);

  return uploader;
}

export function uploadProfiles(files) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/public/profiles`);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const uploader = multer({ storage }).fields([{name: "profile"}]);

  return uploader;
}

export function uploadProducts(files) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/public/products`);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const uploader = multer({ storage }).fields([{name: "productos"}]);

  return uploader;
}