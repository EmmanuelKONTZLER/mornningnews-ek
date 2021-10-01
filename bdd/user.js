var mongoose = require("mongoose");

var userSchema = mongoose.Schema ({
name:String,
email:String,
hash:String,
token:String,
articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'articles'}],
});

var userModel = mongoose.model('users', userSchema)
module.exports = userModel;