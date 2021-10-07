var express = require('express');
var router = express.Router();
var userModel = require('../bdd/user')
var bcrypt = require('bcrypt');
var uid2 = require("uid2")


// Route sign-up ↓↓↓
router.post('/sign-up', async function(req, res, next) {

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
  
  var error = []
  var result = false

  var user = await userModel.find({email: req.body.email})
   
  if (req.body.email == "" || req.body.password == "") {
    error.push("Merci de renseigner tous les champs");
    user = []
  } else if (user[0] == undefined) {
    error.push("Votre email est inconnu");
  } else if (!bcrypt.compareSync(req.body.password, user[0].hash)) {
    error.push("Vos identifiants sont incorrects");
    user = []
  } else {
    result = true
  }

  if (user[0] == undefined) {
    res.json({ error, result });
  } else {
    res.json({ token: user[0].token, error, result });
  }
  
});

module.exports = router;
