const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const scanController = require("../controllers/scanController");
const authMiddleware = require("../Middlewares/authMiddlewares");

router.post(
  "/scan",
  authMiddleware,
  upload.single("image"),
  scanController.scanWaste
);

module.exports = router;
