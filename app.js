const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require('./utils/ExpressError');
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

// View engine & middleware
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// Database connection
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}
main()
    .then(() => console.log("Database is connected"))
    .catch(err => console.log(err));

// Root route
app.get("/", (req, res) => {
    res.redirect("/listings");
});

//Routers for Listings and Reviews
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


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
app.listen(8080, () => {
    console.log("Server is turned on!!");
});
