const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Listing = require('./models/listing');
const methodOverride = require('method-override'); 
const Review = require('./models/review');
const review = require('./models/review');

const MONGO_URL = "mongodb://127.0.0.1:27017/Wonderlust";

main()
.then(() => {
  console.log("connected to MongoDB");
})
.catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
} 

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.set('view engine', 'ejs');  
app.set('views',path.join(__dirname , "/views"));
app.use (express.urlencoded({extended : true}));
app.use(methodOverride('_method')); 
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

//index route
app.get('/listings', async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listing/index.ejs', { allListings });
});

//new listing route
app.get('/listings/new', (req, res) => {
  res.render('listing/new.ejs');
});

//creat new listing route
app.post('/listings', async (req, res,next) => {   
  try {
  const { title, description, price, location, country , image} = req.body;
  const newListing = new Listing({ title, description, price, location, country , image });
  await newListing.save();
  res.redirect('/listings');
} 
catch (err) {
 next(err) ; 
} 
});


//show route
app.get('/listings/:id', async (req, res) => {
   let id = req.params.id;
  const listing = await Listing.findById(id).populate('reviews');
  res.render('listing/show.ejs', { listing });
});

//edit route
app.get('/listings/:id/edit', async (req, res) => {
  let id = req.params.id;
  const listing = await Listing.findById(id);
  res.render('listing/edit.ejs', { listing });
});

//update route
app.put('/listings/:id', async (req, res) => {
  let id = req.params.id;
  const { title, description, price, location, country , image} = req.body;
  await Listing.findByIdAndUpdate(id, { title, description, price, location, country , image });
  res.redirect(`/listings/${id}`);
});

//delete route
app.delete('/listings/:id', async (req, res) => {
  let id = req.params.id;
 let deletedlisting =  await Listing.findByIdAndDelete(id);
 console.log("Deleted listing:", deletedlisting);
  res.redirect('/listings');
});

//route to create a review for a listing
app.post('/listings/:id/reviews', async (req, res) => {
  let listing  = await Listing.findById(req.params.id);
  let newreview = new Review(req.body.review);
  await newreview.save();
   listing.reviews.push(newreview);
   await listing.save();
   res.redirect(`/listings/${listing._id}`);
});

//delete review route
app.delete('/listings/:id/reviews/:reviewId', async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
});


// app.get('/testlisting', async (req , res)=>{
//   const samplelisting = new Listing({
//     title: "Sample Listing",
//     description: "This is a sample listing for testing purposes.",
//     price: 100,
//     location: "Sample Location",
//     country: "Sample Country"
// });

// await samplelisting.save();
// console.log("Sample listing saved to the database");
// res.send("Sample listing saved to the database");
// });

app.use((err, req, res, next) => {  
  res.send("Something went wrong: " + err.message);
});



//root route
app.get('/',(req,res)=>{
    res.send("Hello I am root");
}) 