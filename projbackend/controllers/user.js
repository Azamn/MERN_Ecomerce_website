const User = require("../models/user");
const Order = require("../models/order");


exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if(error || !user ){
            return res.status(400).json({
                error: "NO User is found in DB"
            });
        }
        req.profile = user;
        next();
    });
};


exports.getUser = (req, res,) => {
    // todo : get back here for Password
    req.profile.salt = undefined; // for this in response salt value is not shown.
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

// Get All users Detail Controllers

// exports.getAllUsers = (req, res,) => {
//     User.find().exec((error ,users) => {
//         if(error || !users){
//             return res.status(400).json({
//                 error: "No user in DB"
//             });
//         }
//         res.json(users);
//     });
// };

// update User controllers

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set : req.body},
        {new: true, useFindAndModify: false},
        (error, user) => {
            if(error || !user){
                return res.status(400).json({
                    error: "You are not authorized to update this information."
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }      
    );
};


exports.userPurchaseList = (req, rep) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((error, order) => {
        if(error){
            return res.status(400).json({
                error: "NO Order in this account"
            });
        }
        return res.json(order);
    });
};


exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });

    // store this in databse 
    //Middleware for storing order details
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (error, purchases) => {
            if(error){
                return res.status(400).json({
                    error: "Unable to save purchase list"
                });
            }
            next();
        }
    )

};