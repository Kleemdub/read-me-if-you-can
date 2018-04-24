const passport = require('passport');
const express  = require('express');
const bcrypt   = require('bcryptjs'); 
const flash    = require('flash');
const books    = require('google-books-search');
const Book     = require("../models/bookModel");
const Cache    = require("../models/cacheModel");
const User     = require("../models/userModel");
const router   = express.Router();


// SEARCH BOOK BY TITLE ///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

router.get('/search-book-process', (req, res, next) => {

    var options = {
        field: 'title',
        limit: 30,
        order: 'relevance'
    };

    books.search(req.query.title, options, function(error, results) {
        if (!error) {

            results.forEach((oneBook) => {
                if(oneBook.thumbnail == "undefined") {
                    oneBook.hasThumbnail = false;
                }
                else {
                    oneBook.hasThumbnail = true;
                }
            });
            res.locals.bookFromApi = results;
            res.render('book-add');
        }
        else {
            console.log(error);
        }
    });
});


// SEARCH BOOK BY AUTHOR //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

router.get('/search-author-process', (req, res, next) => {

    var options = {
        field: 'author',
        limit: 30,
        order: 'relevance'
    };

    books.search(req.query.author, options, function(error, results) {
        if (!error) {

            results.forEach((oneBook) => {
                if(oneBook.thumbnail == "undefined") {
                    oneBook.hasThumbnail = false;
                }
                else {
                    oneBook.hasThumbnail = true;
                }
            });
            res.locals.bookFromApi = results;
            res.render('book-add');
        }
        else {
            console.log(error);
        }
    });
});

// ADD BOOK IN THE DATABASE ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

router.post('/add-book-process', (req, res, next) => {

    const { title, author, imageUrl, description } = req.body;
    const status = "pending";
    const user = req.user;

    Book.create({ title, author, imageUrl, description, status, user })
    .then((addedBook) => {
        res.redirect(`/book-caching/${addedBook._id}`);
    })
    .catch((err) => {
        next(err);
    });
});

// End Route--------------------------------------------------
module.exports = router;