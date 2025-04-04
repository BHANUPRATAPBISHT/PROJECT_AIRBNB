const Listing=require("./models/listing")
const Review=require("./models/review")

module.exports.isLoggedin=(req,res,next)=>
{
    if(!req.isAuthenticated())
        {
            req.session.redirectUrl=req.originalUrl;
          req.flash("error","you must login before access!");
           return res.redirect("/login");
        }
        next();

}
module.exports.saveRedirecturl=(req,res,next)=>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next();
}


module.exports.isOwner= async (req,res,next)=>{
    let { id } = req.params;
  let listing=await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id))
  {
    req.flash("error"," You Are Not The Owner")
     return res.redirect(`/listings/${id}`);

  }
  next()
}


module.exports.isreviewAuthor= async (req,res,next)=>{
  let {reviewId,id } = req.params;
  let review=await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id))
  {
    req.flash("error"," You Are Not The Owner of This Review")
     return res.redirect(`/listings/${id}`);

  }
  next();
;
}
