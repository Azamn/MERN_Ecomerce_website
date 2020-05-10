const express = require("express");
const router = express.Router();


const {
    getProductById, 
    createProduct, 
    getProduct, 
    photo, deleteProduct, 
    updateProduct, 
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product");

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");


// alll of param
router.param("productId", getProductById);
router.param("userId", getUserById);

// all ofactual routes

// create route
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

// read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId",photo);

//delete route
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

// update Route
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

// Listing Route
router.get("/products",getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;