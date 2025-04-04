const express=require("express");
const router=express.Router();
const Listing=require('../models/listing.js')
const wrapAsync=require("../utils/wrapAsync.js")
const listings=require("../routes/listing.js")
const ExpressError=require("../utils/ExpressError.js");
const { isLoggedin, isOwner } = require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage})


//index and create route
 router
 .route("/")
  .get( wrapAsync(listingController.index)
  )
  .post(
    isLoggedin,
    upload.single('listing[image]'),
    wrapAsync( listingController.createListing))
 
//new Route
router.get("/new",isLoggedin,listingController.renderNewForm)

// show , delete and update route

    router.route("/:id")
    .get(
      wrapAsync(listingController.showListing))

     .put(isLoggedin,
      isOwner,
      upload.single('listing[image]'),
        wrapAsync(listingController.updateListing))

      .delete(isLoggedin,isOwner,
          wrapAsync( listingController.destroyListing));

//edit route
   router.get("/:id/edit",isLoggedin,isOwner, 
    wrapAsync(listingController.renderEditForm))

  module.exports=router;


