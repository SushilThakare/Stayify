const mongoose = require('mongoose');
const data = require('./data.js');
const Listing = require('../listing.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/Wonderlust";

main()
  .then(() => {
    console.log("connected to MongoDB");
    return initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  const normalizedListings = data.data.map((listing) => ({
    ...listing,
    image:
      typeof listing.image === "string"
        ? listing.image
        : listing.image?.url,
  }));

  await Listing.deleteMany({});
  await Listing.insertMany(normalizedListings);
  console.log("Database initialized");
};