const express=require("express");
const router=express.Router({mergeParams:true});
const Review=require("../models/review.js");
const review = require('../models/review.js');
const Listing=require('../models/listing.js')
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js");
const { isLoggedin, isreviewAuthor, isOwner } = require("../middleware.js");
const reviewController=require("../controllers/review.js")
//post review route
router.post("/",isLoggedin,
  wrapAsync(reviewController.createReview)
);

//delete Route
     router.delete("/:reviewId",isLoggedin,isreviewAuthor,
      wrapAsync(reviewController.destroyReview));



     module.exports=router;