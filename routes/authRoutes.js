const passport = require('passport');
const express  = require('express');
const bcrypt   = require('bcryptjs'); 
const User     = require('../models/userModel');
const router   = express.Router();



// Routes-----------------------------------------------------

//Signup route
router.get("/signup", (req, res, next) => {
  res.render('auth/signup');
});


router.post("/process-signup", (req, res, next) => {
  const { fullName, nickName, email, password} = req.body;

  if(password === "" || password.match(/[0-9]/) === null ){
    res.redirect("/signup");
    return;
  }

  const salt = bcrypt.genSaltSync(10); 
  const encryptedPassword = bcrypt.hashSync(password, salt)

  User.create({fullName, nickName, email, encryptedPassword})
    .then(()=>{
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});


// End Route--------------------------------------------------
module.exports = router;