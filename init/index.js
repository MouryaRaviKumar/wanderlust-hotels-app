const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}
main().then(()=>{
    console.log("Database is connected");
}).catch((err)=>{
    console.log(err);
});

const initDB = async ()=>{
    await Listing.deleteMany({});
    await User.deleteMany({});
    const dummyUser = new User({
        email: "dummyuser@example.com",
        username: "Demo User"
    });
    const registeredUser = await User.register(dummyUser, "dummy_password");
    initData.data = initData.data.map((obj)=>({...obj, owner : registeredUser._id }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized with a valid owner.");
}

initDB();