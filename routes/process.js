const passport = require('passport');
const express  = require('express');
const bcrypt   = require('bcryptjs'); 
const flash    = require('flash');
const books    = require('google-books-search');
const Book     = require("../models/bookModel");
const Cache    = require("../models/cacheModel");
const User     = require("../models/userModel");
const router   = express.Router();

router.get('/search-book-process', (req, res, next) => {

    var options = {
        field: 'title',
        limit: 20,
        order: 'relevance'
    };

    books.search(req.query.title, options, function(error, results) {
        if ( ! error ) {

            results.forEach((oneBook) => {
                if(oneBook.thumbnail == "undefined"){
                    oneBook.hasThumbnail = false;
                }
                else{
                    oneBook.hasThumbnail = true;
                }
            });
            // console.log(results);

            res.locals.bookFromApi = results;

            res.render('book-add');
        } else {
            console.log(error);
        }
    });
});

router.post('/add-book-process', (req, res, next) => {
    // res.send(req.body);

    const { title, author, imageUrl, description } = req.body;
    const status = "pending";
    const user = req.user;

    Book.create({ title, author, imageUrl, description, status, user })
    .then((addedBook) => {
        // console.log('Id of the added book : ' + addedBook._id);
        res.redirect(`/book-caching/${addedBook._id}`);
    })
    .catch((err) => {
        next(err);
    });

});

router.get('/book-caching/:bookId', (req, res, next) => {
    render('book-caching');
});

// End Route--------------------------------------------------
module.exports = router;