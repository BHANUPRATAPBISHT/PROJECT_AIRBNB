// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }


// const reviewSchema=new Schema({
//     comment:String,
//     rating:{
//         type:Number,
//         min:1,
//         max:5

//     },
//     createdAt:{
//         type:Date,
//         default:Date.now(),
//     },
//     author:{
//       type:Schema.Types.ObjectId,
//       ref:"User",
//     },

// });
// module.exports=mongoose.model("Review",reviewSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MONGO_URL = process.env.ATLASDB_URL; // Ensure this is defined

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");
}

main().catch((err) => console.log(err));

const reviewSchema = new Schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
