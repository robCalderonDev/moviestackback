const express = require("express");
const { getUser, postUser, Login } = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getUser);
router.post("/", postUser);
router.post("/login", Login);

module.exports = router;
