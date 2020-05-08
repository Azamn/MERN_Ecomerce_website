
const User = require("../models/user");
const {check, validationResult} = require("express-validator");


exports.signup = (req, res) => {

    const errors = validationResult(req)

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


exports.signout = (req, res) => {
    // res.send("user signout success");        // this a way also to send message
    res.json({                                  // this is a json type send the message to the server in key value pair
        message: "user Signout"   
    });
};