const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");



exports.getProductById = (req, res, next, id) => {

    Product.findById(id)
    .populate("category")
    .exec((error, product) => {
        if(error){
            return res.status(400).json({
                error: "Product Not Found in DB"
            });
        }
        req.product = product;
        next();
    });
};

// create product controllers
exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (error, fields, file) => {
        if(error){
            return res.status(400).json({
                error: "Problem with Image"
            });
        }

        // destructur the field
        const {name, description, price, category, stock} = fields;

        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error: "Please include all field"
            });
        }

        let product = new Product(fields);

        // handle the file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // save the product
        product.save((error, product) => {
            if(error){
                return res.status(400).json({
                    error : "Saving t-shirt in DB Failed"
                });
            }

            res.json(product);
        });

    });
};


exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

// middleware for photo
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", request.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

// delete product Controllers

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((error, deletedProduct) => {
        if(error){
            return res.status(400).json({
                error: "Failed to delete the product"
            });
        }
        res.json({
            message: "Deletion was success", deletedProduct
        });
    });
};

// update product Controllers

exports.updateProduct = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (error, fields, file) => {
        if(error){
            return res.status(400).json({
                error: "Problem with Image"
            });
        }

        // updation code
        let product = req.product;
        product = _.extend(product, fields);

        // handle the file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // save the product
        product.save((error, product) => {
            if(error){
                return res.status(400).json({
                    error : "Updation of product Failed"
                });
            }

            res.json(product);
        });

    });
};

// Get All Product (listing Product)
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((error, products) => {
        if(error){
            return res.status(400).json({
                error: "No products FOUND..!"
            });
        }
        res.json(products);
    });
};


// get Unique Categories product 
exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (error, category) => {
        if(error){
            return res.status(400).json({
                error: "No Category Found..!"
            });
        }
        res.json(category);
    });
};


// middleware
exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id:prod.id}, // filert is used for finding the product
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (error, products) => {
        if(error){
            return res.status(400).json({
                error: "Bulk Operation FAILED..!"
            });
        }
        next();
    });
};

