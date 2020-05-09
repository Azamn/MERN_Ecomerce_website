const Category = require("../models/category");


exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((error, category) => {
        if(error){
            return res.status(400).json({
                error: "Category Not Found In DB"
            });
        }
        req.category = category;
        next();
    });
};

// Adding category in DB
exports.createCategory = (req, res) => {
    const category = new Category(req.body);
        category.save((error, category) => {
            if(error){
                return res.status(400).json({
                    error: "Not Able To Save Category"
                });
            }
            res.json({ category });
        });
};

// getting single category
exports.getCategory = (req, res) => {
    return res.json(req.category);
};


// getting all categories from the DB
exports.getAllCategories = (req, res) => {
    Category.find().exec((error, categories) => {
        if(error){
            return res.status(400).json({
                error: "Categories not Found in DB"
            });
        }

        res.json(categories);
        
    });
};

// update category Controllers
exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((error, updatedCategory) => {
        if(error){
            return res.status(400).json({
                error: "Failed to update category."
            });
        }
            res.json(updatedCategory);
    });
};

// delete category controllers

exports.removeCategory = (req, res) => {
    const category = req.category;

    category.remove((error, category) => {
        if(error){
            return res.status(400).json({
                error: "Failed to delete this category"
            });
        }
        res.json({
            message: "Successfully Deleted"
        });
    });
};