const mongoose = require("mongoose");
const validator = require('validator');
const ErrorController = require("../middlewares/ErrorController");

const userSchema = new mongoose.Schema({
   firstname: {type: String, required: true},
   lastname: {type: String, required: true},
   dob: {type: Date, required: true},
   email: {type: String, validate: [validator.isEmail, 'Enter a valid email address.'], required: true, unique: true},
   phone: {type: Number, required: true},
   password: {type: String, required: true},
   useremailotp: {type: String},
   createduseremailotp: {type: Date},
   loginemailotp: {type: String},
   loginphoneotp: {type: String}
   // confirm_password: {type: String, required: true}
});

 var userModel = mongoose.model("Users", userSchema);
 

module.exports = {userModel};
