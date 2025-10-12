// routes/bapRoutes.js
const express = require("express");
const { handleBAP } = require("../controllers/bapController"); // Correct function name

const router = express.Router();

// Use the correct function here
router.post("/process", handleBAP);

module.exports = router;
