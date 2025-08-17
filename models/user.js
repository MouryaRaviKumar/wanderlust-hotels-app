const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// User schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

// Add username, password hashing, and authentication methods
userSchema.plugin(passportLocalMongoose);

// Export model
module.exports = mongoose.model('User', userSchema);
