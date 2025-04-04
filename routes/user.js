const express=require("express");
const router=express.Router();
const User=require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirecturl } = require("../middleware");
const userContoller=require("../controllers/users")


//signup form and login
router.route("/signup")
.get( userContoller.renderSignUpform)
.post(wrapAsync(userContoller.signup))

//login form and llogin

router.route("/login")
router.get("/login",userContoller.renderLoginFrom)
.post("/login",saveRedirecturl,passport.authenticate("local",
    {failureRedirect:'/login'
    ,failureFlash:true}) ,userContoller.login)





    //logout
router.get("/logout",userContoller.logout)

module.exports=router;