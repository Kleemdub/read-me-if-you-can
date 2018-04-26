const passport   = require('passport');
const express    = require('express');
const bcrypt     = require('bcryptjs'); 
const User       = require('../models/userModel');
const Cache      = require('../models/cacheModel');
const Book       = require('../models/bookModel');
const flash      = require('flash');
const router     = express.Router();
const nodemailer =  require('nodemailer');

// Nodemailer
const transporter =  nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.gmail_user,
    pass: process.env.gmail_pass
  }  
});

let mailMessage = 



// Routes-----------------------------------------------------

//Signup route
router.get("/signup", (req, res, next) => {
  res.render('auth/signup');
});


router.post("/process-signup", (req, res, next) => {
  const { fullName, nickName, email, password, score} = req.body;

  

  if(password === "" || password.match(/[0-9]/) === null ){
    res.redirect("/signup");
    return;
  }

  const salt = bcrypt.genSaltSync(10); 
  const encryptedPassword = bcrypt.hashSync(password, salt)

  User.create({fullName, nickName, email, encryptedPassword, score})

    .then(()=>{
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });

    transporter.sendMail(
      
      {
        from: "Read Me If You Can <readme.ifyoucan9@gmail.com>",
        to: email,
        subject: `Confirmation email`,
        text: `
            "Read Me If You Can" Confirmation Email
            Hello 
            Thanks to join our community! Please confirm your account by clicking here:
            http://localhost:3000/auth/confirm/
            Great to see you on our app 😎
        `,
        html: `
          <h1>"Read Me If You Can" Confirmation Email</h1>
          <h2>Hello </h2>
          <p>Thanks to join our community! Please confirm your account by clicking here:</p>
          <p>http://localhost:3000/auth/confirm/</p>
          <p>Great to see you on our app 😎</p>
        `
      }, 
            
      (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log("mail envoyé");
    })

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


//route for account page
router.get("/user-account/:userId", (req, res, next) => {
  if(!req.user) {
    res.redirect('/signup');
    return;
  }
  else if(req.user._id != req.params.userId) {
    res.redirect('/');
    return;
  }
  User.findById(req.params.userId)
    .then( (usersFromDb) => {
      // console.log(usersFromDb)
      res.locals.user = usersFromDb;

      Promise.all([   Book.find({user:usersFromDb._id})
        .then( (booksFromDb)=>{
          res.locals.myBook = booksFromDb;
          console.log(res.locals.myBook);
        })
        .catch((err) => {
          next(err);
        }),
         
        Cache.find({user:usersFromDb._id})
        .then( (cacheFromDb) => {
          res.locals.myCache = cacheFromDb;
          console.log(res.locals.myCache);

        })
        .catch((err) => {
          next(err);
        })
      
      ]).then(results => {
        res.render('auth/user-account');

      })
   
   

    })
    .catch((err)=>{
      next(err);
    });
});





// End Route--------------------------------------------------
module.exports = router;