const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

//Function to perform Schema Validation
const validateListing = (req,res,next)=>{
    if (!req.body.listing) {
    throw new ExpressError(400, "Invalid listing data");
    }
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    }else{
        next();
    }
};

// Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
router.get("/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
        return next(new ExpressError(404, "Listing you requested does not exist!"));
    }
    res.render("listings/show.ejs", { listing });
}));

// Create Route
router.post("/",validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

// Edit Route
router.get("/:id/edit", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        return next(new ExpressError(404, "Listing not found!"));
    }
    res.render("listings/edit.ejs", { listing });
}));

// Update Route
router.put("/:id",validateListing, wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

// Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

module.exports = router;