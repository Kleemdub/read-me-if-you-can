const passport = require('passport');
const mongoose     = require('mongoose');
const express  = require('express');
const bcrypt   = require('bcryptjs'); 
const User     = require('../models/userModel');
const Cache     = require('../models/cacheModel');
const Book     = require('../models/bookModel');
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
  Book.find({status: "cached"})
  .then((bookList) => {
    res.locals.books = bookList;
    res.render('books-list');
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/book-page/:bookId', (req, res, next) => {
  if(!req.user) {
    res.redirect('/signup');
    return;
  }

  Book.findById(req.params.bookId)
  .populate('cache')
  .then((selectedBook) => {
    res.locals.book = selectedBook;
    res.render('book-page');
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/book-caching/:bookId/:tracking', (req, res, next) => {
  if(!req.user) {
    res.redirect('/signup');
    return;
  }
  
  res.locals.bookId = req.params.bookId;
  res.locals.tracking = req.params.tracking;
  res.render('book-caching');
});


// BOOK CACHING - GOOGLE MAPS ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


router.post('/process-caching/:bookId', (req, res, next) => {
  // res.send(req.body);

  const {clue, latitude, longitude} = req.body;

  const location = {
    type: 'Point',
    coordinates: [latitude, longitude]
  };

  const user = req.user._id;
  console.log(req.user.score);

  const book = req.params.bookId;

  Cache.create({clue, location, user, book})
  .then((addedCache)=>{
    const cache = addedCache._id;
    status = "cached";
    
    // return 
    Book.findByIdAndUpdate(book, {status, cache})
    // .then(()=>{
    //   User.findByIdAndUpdate((user)=>{score})
    // })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
  })
  .catch((err)=>{
    next(err);
  })
});


//route to add the location from the DB to appear them on the front end (ça fonctionne)
router.get('/caching/data', (req, res, next)=>{
  Cache.find()
  .populate('book')
  .then((cacheFromDb) => {
    res.json(cacheFromDb);
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/caching/book/data/:bookID', (req, res, next)=>{
  Cache.findOne({book:req.params.bookID})
  .populate('book')
  .then((cacheFromDb) => {
    res.json(cacheFromDb);
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/checkFound/:bookID/:tracking', (req, res, next)=>{
  
  const bookID = req.params.bookID;
  var tracking = req.params.tracking;
  tracking = tracking.toUpperCase();

  Book.findById(bookID)
  .then((findedBook) => {
    var trackingOk = findedBook.trackingCode;
    if(tracking == trackingOk) {
      res.send(true);
    }
    else {
      res.send(false);
    }
  })
  .catch((err) => {
    next(err);
  });
});



module.exports = router;
