const express = require("express");
const router = express.Router();
const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/users.js");

router.get("/signup",userController.renderSignupPage);


router.post("/signup", wrapAsync(userController.signUp));


router.get("/login",userController.renderLoginPage);


router.post("/login", 
    saveRedirectUrl , 
    passport.authenticate("local",{ failureRedirect : "/login", failureFlash : true}),
    userController.loginUser);


router.get("/logout",userController.logoutUser);


module.exports = router;