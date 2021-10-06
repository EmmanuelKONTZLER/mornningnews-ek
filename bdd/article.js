var mongoose = require("mongoose");

var articleSchema = mongoose.Schema ({
title: String,
content: String,
description: String,
urlToImage: String,
users: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
});

var articleModel = mongoose.model('articles', articleSchema)
module.exports = articleModel;