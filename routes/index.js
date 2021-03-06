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

router.get('/my-book-page/:bookId', (req, res, next) => {
  if(!req.user) {
    res.redirect('/signup');
    return;
  }

  Book.findById(req.params.bookId)
  .populate('cache')
  .then((selectedBook) => {
    res.locals.userId = req.user._id;
    res.locals.book = selectedBook;
    res.render('my-book-page');
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

router.get('/dashboard', (req, res, next) =>{
  if(!req.user) {
    res.redirect('/signup');
    return;
  }
  User.find().sort({ "score": -1 }).limit(20)
    .then((user)=>{
      var pos = 1;
      user.forEach((oneUser) => {
        oneUser.position = pos;
        pos++;
      });
      res.locals.allUser = user;
      res.render('dashboard');
    })
    .catch((err)=>{
      next(err);
    })
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
  // console.log(req.user.score);

  const book = req.params.bookId;

  Cache.create({clue, location, user, book})
  .then((addedCache)=>{
    const cache = addedCache._id;
    status = "cached";
    return cache;
  })
  .then((cache) => {
    return Book.findByIdAndUpdate(book, {status, cache});
  })
  .then(() => {
    return User.findByIdAndUpdate(user, { $inc: { score: 10 }});
  })
  .then(() => {
    res.redirect('/');
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

router.get('/found-this-book/:bookId/:userId', (req, res, next) => {
  res.render('found-this-book');
});



module.exports = router;
