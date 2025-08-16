const User = require("../models/user.js");
const flash = require("connect-flash");

module.exports.renderSignupPage = (req,res)=>{
    res.render("users/signup.ejs");
};

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

module.exports.renderLoginPage = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.loginUser = (req,res)=>{
    req.flash("success", `Welcome back, ${req.user.username}!`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged Out Successfully");
        return res.redirect("/listings");
    });
};