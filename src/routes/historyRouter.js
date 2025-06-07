const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");
const authMiddleware = require("../Middlewares/authMiddlewares");

router.get("/", authMiddleware, historyController.getScanHistory);

module.exports = router;
