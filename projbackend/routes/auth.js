
var express = require("express");
var router = express.Router();
const {check, validationResult} = require("express-validator");

const {signup,signout} = require("../controllers/auth");


router.post("/signup", [
    check("name","name should be atleast 3 character").isLength({ min: 3 }),
    check("email","email is required").isEmail(),
    check("password","password should be atlest 3 character").isLength({ min: 3 }),
], signup);
router.get("/signout", signout);

module.exports = router;