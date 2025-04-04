if(process.env.NODE_ENV !="production")
{
  require('dotenv').config();
}



const express=require('express');

const app=express();
const mongoose=require('mongoose');
const Listing=require('./models/listing.js')
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
app.use(express.static(path.join(__dirname,"./public" )));
const wrapAsync=require("./utils/wrapAsync.js")
const ExpressError=require("./utils/ExpressError.js")
 const Review=require("./models/review.js");
const review = require('./models/review.js');
app.engine("ejs",ejsMate);
const flash=require("connect-flash")
const session=require("express-session")
app.set("view engine", "ejs");
const reviewsRouter=require("./routes/review.js");
const listingsRouter=require("./routes/listing.js");
const userRouter=require("./routes/user.js");


const {isLoggedin}=require("./middleware.js");
const { createSecretKey } = require('crypto');
app.set("views", path.join(__dirname, "views"));

const dbUrl=process.env.ATLASDB_URL;
console.log("Connected to:", dbUrl);

app.use(express.urlencoded({extended:true}))
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const { deserialize } = require('v8');
app.use(methodOverride("_method"));
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// async function main() {
//   await mongoose.connect(dbUrl);
// }
async function main() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(dbUrl);
  }
}

const MongoStore = require('connect-mongo');


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: "mycopde"
  },
  touchAfter: 24 * 3600, // 1 day
});
store.on("error", (err) => {
  console.log("Error in mongoose session store:", err);
});

//session

const sessionOption={
  store, 
   secret:"mycopde",
   resave:false,
   saveUninitialized:true,
}






app.use(flash());
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>
{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})

//demo user
app.get("/demoUser",async (req,res)=>{
  let fakeUser=new User({
    email:"bhanu@gmail.com",
    username:"harsj"
  })
  let registerUser= await User.register(fakeUser,"helloworld")
  res.send(registerUser);
})

//Router folder
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);   
app.use("/",userRouter);   
   
  
// app.get("/",(req,res)=>{
//     res.send("hey i am root");
// })

app.listen(8080,()=>{
    console.log("server is listenning");

})

app.all("*",(req,res,next)=>{
  next(new  ExpressError(404,"somthing went wrong"))
})
//error handle
app.use((err,req,res,next)=>{
  let{statusCode=404,message="wrong"}=err;
 res.render("./listings/error.ejs",{err})
  
})


