// routes/ivrRoutes.js
const express = require("express");
const { handleIVRRequest } = require("../controllers/ivrController");

const router = express.Router();

// The endpoint for the legacy system is /request, not /input
router.post("/request", handleIVRRequest);

module.exports = router;
