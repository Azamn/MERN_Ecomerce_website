const express = require("express");
const router = express.Router();

const {getCategoryById, createCategory, getAllCategories, getCategory, updateCategory,removeCategory} = require("../controllers/category");
const {isAuthenticated, isSignedIn, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");


// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);


// actual Routes Here
// creates Route
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

// Read Routes
router.get("/category/:categoryId", getCategory);
router.get("/categories",getAllCategories);

//Update Route
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);

//delete
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router;