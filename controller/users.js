const User = require("../models/user.js");
const Listing = require("../models/listing.js"); // Make sure to import the Listing model
const flash = require("connect-flash");

// Render Signup Page
module.exports.renderSignupPage = (req, res) => {
    res.render("users/signup.ejs");
};

// Handle User Signup
module.exports.signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        req.flash("error", "All fields are required!");
        return res.redirect("/signup");
    }
    try {
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

// Render Login Page
module.exports.renderLoginPage = (req, res) => {
    res.render("users/login.ejs");
};

// Handle User Login
module.exports.loginUser = (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}!`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// Handle User Logout
module.exports.logoutUser = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged Out Successfully");
        return res.redirect("/listings");
    });
};

// ** NEW ** Render the user's dashboard
module.exports.renderDashboard = async (req, res) => {
    // Find all listings owned by the current user and populate their reviews
    const userListings = await Listing.find({ owner: req.user._id }).populate({
        path: 'reviews',
        populate: {
            path: 'author' // Also populate the author of each review
        }
    });

    // If the user has no listings, they can't see the dashboard
    if (userListings.length === 0) {
        req.flash("error", "You must create a listing to view your dashboard.");
        return res.redirect("/listings/new");
    }

    res.render("users/dashboard.ejs", { listings: userListings });
};

