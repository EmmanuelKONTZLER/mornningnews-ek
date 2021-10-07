var express = require('express');
var router = express.Router();
var userModel = require('../bdd/user')
var articleModel = require('../bdd/article')
var request = require('sync-request');
var bcrypt = require('bcrypt');
var uid2 = require("uid2")
var apiKey = process.env.APIKEY


// Route sign-up ↓↓↓
router.post('/sign-up', async function(req, res, next) {
  console.log("route sign-up")

  var error = []
  var result = false

  if (req.body.name == "" || req.body.email == "" ||req.body.password == "" ) {
    error.push("Merci de renseigner tous les champs");
  }

  var check = await userModel.find({email:req.body.email})
 
  if (check.length != 0) {
    error.push("Votre email est déja enregistré")
  }

  if (error.length == 0) { 
    const cost = 10;
    const hash = bcrypt.hashSync(req.body.password, cost);
    result = true
    var user = new userModel({
    name: req.body.name,
    email: req.body.email,
    language: "fr",
    hash: hash,
    token: uid2(32)
    })
  
    user = await user.save()
  }
if(result) {
  res.json({ token: user.token, error, result });
} else {
  res.json({ error, result });
}

});

// Route sign-in ↓↓↓
router.post('/sign-in', async function(req, res, next) {
  console.log("route sign-in", req.body)

  var error = []
  var result = false

  var user = await userModel.find({email: req.body.email})
  console.log('signin user', user[0])
 
  if (req.body.email == "" || req.body.password == "") {
    console.log("check1")
    error.push("Merci de renseigner tous les champs");
    user = []
  } else if (user[0] == undefined) {
    console.log("check2")
    error.push("Votre email est inconnu");
  } else if (!bcrypt.compareSync(req.body.password, user[0].hash)) {
    console.log("check3")
    error.push("Vos identifiants sont incorrects");
    user = []
  } else {
    console.log("check4")
    result = true
  }

  if (user[0] == undefined) {
    res.json({ error, result });
  } else {
    res.json({ token: user[0].token, error, result });
  }

  
});

// Route get sources ↓↓↓
router.get('/get-sources', async function(req, res, next) {
  console.log("route get-sources", req.query.language)
  var requete = request("GET", `https://newsapi.org/v2/top-headlines/sources?&country=${req.query.country}&language=${req.query.language}&apiKey=${apiKey}`);
  var sources = JSON.parse(requete.body);
  
  console.log("sources",sources) 
  
  res.json({ sources });
});

// Route get articles by source ↓↓↓
router.get('/get-articles-by-source', async function(req, res, next) {
  console.log("route get-articles-by-source", req.query)
  var id = req.query.id

  var requete = request("GET", `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=${apiKey}`);
  var articles = JSON.parse(requete.body);
  // var articles = []
  console.log("articles",articles) 
  
  res.json({ articles });
});


// Route add article on wishlist ↓↓↓
router.post('/add-on-wishlist', async function(req, res, next) {
 
  var articles = await articleModel.findOne({title: req.body.title})
  console.log('addarticle',articles)
  var user = await userModel.findOne({token: req.body.token})
  console.log('adduser', user)
  // si l'article n'est pas enregistré:
  // - je l'enregistre en bdd, 
  // - j'enregistre l'id de l'article en clé étrangère dans la collection users
  if (!articles) {
    console.log(`l'article n'est pas dans la BDD`)
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
    console.log(`l'article est déjà dans la BDD`)
  // si l'article est déjà enregistré en bdd :
  // - je vérifie si il n'est pas déjà enregistré dans la collection users, le cas échéant :
    // - j'enregistre l'id de l'article en clé étrangère dans la collection users
    if (user.articles.filter(e => e == articles.id).length == 0) {
      console.log(`l'article n'est pas dans la wishlist de l'user`)
      user.articles.push(articles.id);
      user = await user.save()
    }
  } 

  res.json({ result: "success" });
});

// Route get articles in wishlist ↓↓↓
router.get('/get-articles-in-wishlist', async function(req, res, next) {
  console.log("route get-articles-in-wishlist", req.query)
  var user = await userModel.find({token: req.query.token})
                                .populate("articles")
                                .exec()
  // var articles = []
   console.log("user",user) 
   console.log("user.articles",user[0].articles) 
  
  res.json({ articles: user[0].articles});
});

// Route delete article from wishlist
router.delete('/delete-article', async function(req, res, next) {
  console.log("route delete article", req.query)
  var article = await articleModel.findById(req.query.id);
  console.log('article1', article)
  var user = await userModel.findOne({token: req.query.token});
  console.log('user', user)
 
  // Suppression de l'article dans le document user
   user.articles = user.articles.filter(e => e != article.id);
   console.log("123", user.articles);
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
