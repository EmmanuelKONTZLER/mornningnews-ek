var mongoose = require("mongoose");

var userSchema = mongoose.Schema ({
name:String,
email:String,
hash:String,
token:String
});

var userModel = mongoose.model('users', userSchema)
module.exports = userModel;