var express = require('express');
var router = express.Router();
var userModel = require('../bdd/user')
var articleModel = require('../bdd/article')
var request = require('sync-request');
var apiKey = process.env.APIKEY


// Route get sources ↓↓↓
router.get('/get-sources', async function(req, res, next) {

  var requete = request("GET", `https://newsapi.org/v2/top-headlines/sources?&country=${req.query.country}&language=${req.query.language}&apiKey=${apiKey}`);
  var sources = JSON.parse(requete.body);

  res.json({ sources });
});

// Route get articles by source ↓↓↓
router.get('/get-articles-by-source', async function(req, res, next) {
 
  var id = req.query.id

  var requete = request("GET", `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=${apiKey}`);
  var articles = JSON.parse(requete.body);
  
  res.json({ articles });
});


// Route add article on wishlist ↓↓↓
router.post('/add-on-wishlist', async function(req, res, next) {
 
  var articles = await articleModel.findOne({title: req.body.title})
  var user = await userModel.findOne({token: req.body.token})

  // si l'article n'est pas enregistré:
  // - je l'enregistre en bdd, 
  // - j'enregistre l'id de l'article en clé étrangère dans la collection users
  if (!articles) {
    var article = new articleModel({
      title: req.body.title,
      content: req.body.content,
      description: req.body.description,
      urlToImage: req.body.urlToImage
      })
      article = await article.save();
      user.articles.push(article._id)
      user = await user.save()
  } else {
  // si l'article est déjà enregistré en bdd :
  // - je vérifie si il n'est pas déjà enregistré dans la collection users, le cas échéant :
    // - j'enregistre l'id de l'article en clé étrangère dans la collection users
    if (user.articles.filter(e => e == articles.id).length == 0) {
      user.articles.push(articles.id);
      user = await user.save()
    }
  } 

  res.json({ result: "success" });
});

// Route get articles in wishlist ↓↓↓
router.get('/get-articles-in-wishlist', async function(req, res, next) {
  
  var user = await userModel.find({token: req.query.token})
                                .populate("articles")
                                .exec()
    
  res.json({ articles: user[0].articles});
});

// Route delete article from wishlist
router.delete('/delete-article', async function(req, res, next) {
 
  var article = await articleModel.findById(req.query.id);
  var user = await userModel.findOne({token: req.query.token});
 
  // Suppression de l'article dans le document user
  user.articles = user.articles.filter(e => e != article.id);
  user = await user.save();

  // si l'article n'est plus liké, suppression de l'article de la BDD
  var data = await userModel.find({articles: { "$in":  req.query.id  }})
  if (data.length == 0) {
    article = await articleModel.deleteOne({_id:req.query.id})
  }
  
  user = await userModel.find({token: req.query.token})
  .populate("articles")
  .exec()
  
  res.json({ articles: user[0].articles});
});



module.exports = router;
