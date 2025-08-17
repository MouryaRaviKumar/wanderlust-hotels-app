const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

// Connect to MongoDB
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}
main()
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });

// Initialize database with seed data
const initDB = async () => {
    await Listing.deleteMany({});
    await User.deleteMany({});

    // Create a dummy user
    const dummyUser = new User({
        email: "dummyuser@example.com",
        username: "Demo User"
    });

    // Register dummy user with password
    const registeredUser = await User.register(dummyUser, "dummy_password");

    // Assign the dummy user as owner for all listings
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: registeredUser._id
    }));

    // Insert seed listings
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample listings and a valid owner.");
};

initDB();
