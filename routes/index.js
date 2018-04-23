const passport = require('passport');
const express  = require('express');
const bcrypt   = require('bcryptjs'); 
const User     = require('../models/userModel');
const flash = require('flash');
const router   = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/book-add', (req, res, next) => {
  res.render('book-add');
});

router.get('/books-list', (req, res, next) => {
  res.render('books-list');
});

module.exports = router;
