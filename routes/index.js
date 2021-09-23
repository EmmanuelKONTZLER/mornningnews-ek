var express = require('express');
var router = express.Router();
var userModel = require('../bdd/user')


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
    result = true
    var user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
    })
  
    user = await user.save()
  }

  res.json({ user, error, result });
});

// Route sign-in ↓↓↓
router.post('/sign-in', async function(req, res, next) {
  console.log("route sign-in")

  var error = []
  var result = false

  var user = await userModel.find({email: req.body.email})
 
  if (req.body.email == "" ||req.body.password == "") {
    error.push("Merci de renseigner tous les champs");
    user = []
  } else if (user == []) {
    error.push("Votre email est inconnu");
  } else if (
    user[0].password != req.body.password 
  ) {
    error.push("Vos identifiants sont incorrects");
    user = []
  } else {
    result = true
  }

  res.json({ user, error, result });
});

module.exports = router;
