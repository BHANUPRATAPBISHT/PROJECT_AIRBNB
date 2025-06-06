const User=require("../models/user")
const review = require('../models/review.js');




module.exports.renderSignUpform=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup=async (req,res)=> {
    try
    {
        let {username,email,password}=req.body;
        const newUser= new User({email,username});
         const registerUser=await User.register(newUser,password);
         req.flash("success","user was registered Successfully");
         res.redirect("/listings"); 

    }
    catch(e)
    {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
      
}

module.exports.renderLoginFrom=(req,res)=>{
    res.render("users/login.ejs")
}
module.exports.login=async(req,res)=>{
    req.flash("success","you loged in");
    let redirectUrl=res.locals.redirectUrl || '/listings'
    res.redirect(redirectUrl)

}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success"," you finally Logout!")
        res.redirect("/listings");
        
    })
}