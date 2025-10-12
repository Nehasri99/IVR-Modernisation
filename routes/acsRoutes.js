// routes/acsRoutes.js
const express = require("express");
const { handleACS } = require("../controllers/acsController"); // Correct function name

const router = express.Router();


router.post("/process", handleACS);

module.exports = router;
