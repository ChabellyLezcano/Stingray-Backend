const express = require("express");
const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "public/uploads/");
      },
      filename: function (req, file, cb) {
        const uniqueSuffix =
          Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
        cb(null, file.fieldname + "-" + uniqueSuffix);
      },
    }),
    fileFilter: function (req, file, cb) {
      if (file.mimetype !== "image/jpeg") {
        return cb(new Error("Solo se permiten archivos JPG"));
      }
      cb(null, true);
    },
  });





  module.exports = { upload };
  