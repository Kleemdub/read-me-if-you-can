const passport = require('passport');
const express  = require('express');
const bcrypt   = require('bcryptjs'); 
const User     = require('../models/userModel');
const Cache     = require('../models/cacheModel');
const flash = require('flash');
const router   = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  if(!req.user) {
    res.redirect('/signup');
    return;
  }
  res.render('index');
});

router.get('/book-add', (req, res, next) => {
  if(!req.user) {
    res.redirect('/signup');
    return;
  }
  res.render('book-add');
});

router.get('/books-list', (req, res, next) => {
  if(!req.user) {
    res.redirect('/signup');
    return;
  }
  res.render('books-list');
});

router.get('/book-page/:bookId', (req, res, next) => {
  if(!req.user) {
    res.redirect('/signup');
    return;
  }
  res.render('book-page');
});



// BOOK CACHING - GOOGLE MAPS ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


router.post('/process-caching', (req, res, next) => {
res.send(req.body);

//   const {clue, latitude, longitude} = req.body;

// const location = {
//   type: 'Point',
//   coordinates: [latitude, longitude]
// };

// Cache.create({clue, location})
//   .then(()=>{
//     res.redirect('/');
//   })
//   .catch((err)=>{
//     next(err);
//   })
});


//route to add the location from the DB to appear them on the front end (ça fonctionne)
router.get('/caching/data', (req, res, next)=>{
  Cache.find()
    .then((cacheFromDb) => {
      res.json(cacheFromDb);
    })
    .catch((err) => {
      next(err);
    });
});



router.get('/book-caching/:bookId', (req, res, next) => {
  if(!req.user) {
    res.redirect('/signup');
    return;
  }
  res.render('book-caching');
});


module.exports = router;
