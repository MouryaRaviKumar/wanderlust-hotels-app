// ADDED: Environment variable validation at the very top
const { cleanEnv, str, port } = require('envalid');
require("dotenv").config();

const env = cleanEnv(process.env, {
    CLOUD_NAME: str(),
    CLOUD_API_KEY: str(),
    CLOUD_API_SECRET: str(),
    MAP_TOKEN: str(),
    MONGO_URL: str({ default: "mongodb://127.0.0.1:27017/airbnb" }),
    SESSION_SECRET: str({ default: "mysupersecretcode" }),
    PORT: port({ default: 8080 }),
});


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require('./utils/ExpressError');
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listingRouter.js");
const reviewsRouter = require("./routes/reviewRouter.js");
const userRouter= require("./routes/userRouter.js");

// Database connection
async function main() {
    await mongoose.connect(env.MONGO_URL);
}
main()
    .then(() => console.log("Database connection successful."))
    .catch(err => console.log(err));

// UPDATED: More robust database connection logic
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on('disconnected', () => {
    console.log('Mongoose disconnected');
});


// View engine & middleware
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// Session settings 
const sessionOptions = {
    secret : env.SESSION_SECRET, // UPDATED: Using secret from .env
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 1000 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7,
        httpOnly : true,
    },
};

// Root route
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// Session and flash middleware  
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

//Static Serialize and Deserialize for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to Flash Messages available in all views
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

//Routers for Listings and Reviews
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",userRouter);


// 404 Handler
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// Error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("listings/error.ejs", { statusCode, message });
});

// Start server
app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});