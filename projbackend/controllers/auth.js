
const User = require("../models/user");
const {check, validationResult} = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

// signup Controllers
exports.signup = (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

   const user = new User(req.body);
   user.save((err,user) => {
       if(err){
           return res.status(400).json({
               err: "NOT able to save user in DB."
           }); 
       }
       res.json({
           nmae:user.name,
           email: user.email,
           id: user._id
       });
   });
};

// signin Controllers
exports.signin = (req,res) => {
    const errors = validationResult(req); 

    const { email,password } = req.body;

       
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        });
    }

    User.findOne({email},(err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "USER email is does not exists"
            });
        }

        if(!user.authenticate(password)){
           return res.status(401).json({
                error: "Email and password do not match"
            });
        }

        // create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        // put token in cookie
        res.cookie("token", token, {expire:new Date() + 9999 });

        //send response on front end
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, name, email, role} });

    });

};


// signout controller
exports.signout = (req, res) => { 
    // res.send("user signout success"); 
    res.clearCookie("token");       // this a way also to send message
    res.json({                                  // this is a json type send the message to the server in key value pair
        message: "User Signout successfully."   
    });
};

// protected routes

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});


// custom middlewares

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role == 0){
        return res.status(403).json({
            error:"You Are Not Admin, ACCESS DENIED"
        });
    }
    next();
};