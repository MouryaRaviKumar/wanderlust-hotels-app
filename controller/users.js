const User = require("../models/user.js"); // Import User model
const flash = require("connect-flash"); // Import flash for messages

// Render Signup Page
module.exports.renderSignupPage = (req,res)=>{
    res.render("users/signup.ejs"); // Show signup form
};

// Handle User Signup
module.exports.signUp = async (req, res, next) => {
    const { username, email, password } = req.body; // Extract user details
    if (!username || !email || !password) {
        req.flash("error", "All fields are required!"); // Show error if any field missing
        return res.redirect("/signup"); // Redirect back to signup page
    }
    try {
        const newUser = new User({ email, username }); // Create new user instance
        const registeredUser = await User.register(newUser, password); // Register user with password
        req.login(registeredUser, (err) => { // Auto login after signup
            if (err) return next(err); // Pass error to middleware
            req.flash("success", "Welcome to Wanderlust!"); // Success message
            res.redirect("/listings"); // Redirect to listings page
        });
    } catch (err) {
        req.flash("error", err.message); // Flash error if registration fails
        res.redirect("/signup"); // Redirect back to signup
    }
};

// Render Login Page
module.exports.renderLoginPage = (req,res)=>{
    res.render("users/login.ejs"); // Show login form
};

// Handle User Login
module.exports.loginUser = (req,res)=>{
    req.flash("success", `Welcome back, ${req.user.username}!`); // Success message after login
    let redirectUrl = res.locals.redirectUrl || "/listings"; // Redirect to previous URL or listings
    res.redirect(redirectUrl); // Redirect user
};

// Handle User Logout
module.exports.logoutUser = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err); // Handle logout error
        }
        req.flash("success","Logged Out Successfully"); // Flash logout success message
        return res.redirect("/listings"); // Redirect to listings page
    });
};
