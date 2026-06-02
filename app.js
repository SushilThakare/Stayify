const express = require('express'); 
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Listing = require('./models/listing');
const methodOverride = require('method-override'); 
const Review = require('./models/review');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const flash = require('connect-flash');

const MONGO_URL = "mongodb://127.0.0.1:27017/Wonderlust";

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};



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

app.use(session(sessionOptions));
app.use(flash()); 

app.use(passport.initialize());
app.use(passport.session());  

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currUser = req.user;
  next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to check if user is authenticated
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to perform this action.');
    return res.redirect('/login');
  }
  next();
};

//index route
app.get('/listings', async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listing/index.ejs', { allListings });
});

//new listing route
app.get('/listings/new', (req, res) => {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to create a listing.');
    return res.redirect('/login');
  } 
  res.render('listing/new.ejs');
});

//creat new listing route
app.post('/listings', isLoggedIn, async (req, res, next) => {   
  try {
    const { title, description, price, location, country, image } = req.body;
    const newListing = new Listing({ title, description, price, location, country, image });
    await newListing.save();
    req.flash('success', 'New listing created successfully!');
    res.redirect('/listings');
  } catch (err) {
    next(err); 
  } 
});


//show route
app.get('/listings/:id', async (req, res) => {
   let id = req.params.id;
  const listing = await Listing.findById(id).populate('reviews');
  res.render('listing/show.ejs', { listing });
});

//edit route
app.get('/listings/:id/edit', isLoggedIn, async (req, res) => {
  let id = req.params.id;
  const listing = await Listing.findById(id);
  res.render('listing/edit.ejs', { listing });
});

//update route
app.put('/listings/:id', isLoggedIn, async (req, res) => {
  let id = req.params.id;
  const { title, description, price, location, country, image } = req.body;
  await Listing.findByIdAndUpdate(id, { title, description, price, location, country, image });
  req.flash('success', 'Listing updated successfully!');
  res.redirect(`/listings/${id}`);
});

//delete route
app.delete('/listings/:id', isLoggedIn, async (req, res) => {
  let id = req.params.id;
  let deletedlisting = await Listing.findByIdAndDelete(id);
  console.log("Deleted listing:", deletedlisting);
  req.flash('success', 'Listing deleted successfully!');
  res.redirect('/listings');
});

//route to create a review for a listing
app.post('/listings/:id/reviews', isLoggedIn, async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newreview = new Review(req.body.review);
  await newreview.save();
  listing.reviews.push(newreview);
  await listing.save();
  req.flash('success', 'Review added successfully!');
  res.redirect(`/listings/${listing._id}`);
});

//delete review route
app.delete('/listings/:id/reviews/:reviewId', isLoggedIn, async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Review deleted successfully!');
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

app.get('/signup', (req, res) => {
    res.render('users/signup');
});

app.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to Stayify! Registration successful.');
      res.redirect('/listings');
    });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/signup');
  }
});

app.get('/login', (req, res) => {
    res.render('users/login.ejs');
});

app.post('/login', passport.authenticate('local', {
  failureRedirect : "/login",
  failureFlash : true,
}), (req, res) => {
  req.flash('success', 'Login successful!');
  res.redirect('/listings');
});  

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye! You have successfully logged out.");
    res.redirect("/listings");
  });
});
 
//root route
app.get('/',(req,res)=>{
    res.send("Hello I am root");
}) 