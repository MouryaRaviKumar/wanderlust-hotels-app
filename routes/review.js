const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//Function to validate Review
const validateReview = (req,res,next)=>{
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    }else{
        next();
    }
};

//Review Route
router.post("/", validateReview, wrapAsync(async (req,res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${id}`);
}));

//Delete review route
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id , reviewId} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));

module.exports = router;