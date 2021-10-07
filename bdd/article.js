var mongoose = require("mongoose");

var articleSchema = mongoose.Schema ({
title: String,
content: String,
description: String,
urlToImage: String,
});

var articleModel = mongoose.model('articles', articleSchema)
module.exports = articleModel;