const { Order, ProductCart} = require("../models/order");

exports.getOrderById = (req, res, next, id) => {

    Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
        if(error){
            return res.status(400).json({
                error: "No Order Found in DB"
            });
        }
        req.order = order;
        next();
    });

};

// create order controllers
exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);

    order.save((error, order) => {
        if(error){
            return res.status(400).json({
                error: "Failed to save your order in DB"
            });
        }
        res.json(order);
    });
};

//get all products controllers
exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name ")
    .exec((error, orders) => {
        if(error){
            return res.status(400).json({
                errorr: "No orders found in DB"
            });
        }
        res.json(orders);
    });
};


exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};


exports.updateStatus = (req, res) => {
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (error, order) => {
            if(error){
                return res.status(400).json({
                    error: "Cannot Update Order Status"
                });
            }
            res.json(order);
        }
    );
};