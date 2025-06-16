const express = require("express");
const router = express.Router();
const controller = require("../controllers/proxy.controller");

router.use("/", controller.proxyApiCall);

module.exports = router;
