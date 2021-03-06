
var express = require("express");
var router = express.Router();
const {check, validationResult} = require("express-validator");

const {signup,signout,signin,isSignedIn} = require("../controllers/auth");

// signup route
router.post("/signup", [
    check("name","name should be atleast 3 character").isLength({ min: 3 }),
    check("email","email is required").isEmail(),
    check("password","password should be atlest 3 character").isLength({ min: 3 }),

], 
signup);

// signin route
router.post("/signin", [
    check("email","email is required").isEmail(),
    check("password","password field is required.").isLength({ min: 1 }),

], 
signin);

//signout route
router.get("/signout", signout);


// router.get("/testroute", isSignedIn, (req, res) => {
//     res.json(req.auth);
// });



module.exports = router;