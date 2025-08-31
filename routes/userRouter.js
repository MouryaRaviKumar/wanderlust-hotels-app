const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js"); // Make sure isLoggedIn is imported
const userController = require("../controller/users.js");

// Signup Routes
router.get("/signup", userController.renderSignupPage);
router.post("/signup", wrapAsync(userController.signUp));

// Login Routes
router.get("/login", userController.renderLoginPage);
router.post("/login", 
    saveRedirectUrl, 
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    userController.loginUser
);

// Logout Route
router.get("/logout", userController.logoutUser);

// ** NEW ** Dashboard Route
router.get("/dashboard", isLoggedIn, wrapAsync(userController.renderDashboard));

module.exports = router;

