const passport = require('passport');
const express  = require('express');
const bcrypt   = require('bcryptjs'); 
const User     = require('../models/userModel');
const flash = require('flash');
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

//login Route
router.get("/login", (req, res, next) =>{
  res.render("auth/login");
});

router.post("/process-login", (req, res, next) => {
  const {email, password} = req.body;

  User.findOne({ email })
    .then((userDetails)=>{
      if (!userDetails){
        res.redirect("/login");
        return;
      }
      
      const { encryptedPassword } = userDetails;
      if(!bcrypt.compareSync(password, encryptedPassword)) {
        res.redirect("/login");
        return
      }
    
      req.login(userDetails, () =>{
        res.redirect("/");
      });
    })
    .catch((err) => {
      next(err);
    });

});


//logout route
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/signup");
});

//Route Google 
router.get("/google/login", passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/plus.login",
    "https://www.googleapis.com/auth/plus.profile.emails.read"
  ]
}));

router.get("/google/success", passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login",
}));

router.get("/user-account/:userId", (req, res, next) => {
  if(!req.user) {
    res.redirect('/signup');
    return;
  }
  res.render('auth/user-account');
});

// End Route--------------------------------------------------
module.exports = router;