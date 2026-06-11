const express = require("express");
const router = express.Router();
const {
  displayHomePage,
  displayResumePage,
  displayBasePage,
} = require("../controllers/pageController");

router.get("/", (req, res) => displayBasePage(req, res));

router.get("/Home", (req, res) => displayHomePage(req, res));

router.get("/Resume", (req, res) => displayResumePage(req, res));

module.exports = router;
