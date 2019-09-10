const express = require('express');
const router = express.Router();

const db = require('../db');
const { Book } = db.models;


// JSON Parser
router.use(express.json());
router.use (express.urlencoded({extended: false}))

// render the add new book form
router.get('/books/new', (req, res) => {

    try { 
        res.render('newBook');

    } catch (error) {
        throw error;
    }
});

// add book to database
router.post('/books/new', (req, res) => {
    console.log("it's posting");

    (async () => {
        try { 
            console.log(req)
            const newBook = await Book.create({
                title: 'New Book',
                author: 'New Author',
                genre: 'Fiction',
                year: 2019
            })
            console.log(newBook.toJSON());
            res.redirect('/');

        } catch (error) {
            if (error.name === 'SequelizeValidationError') { 
                const errors = error.errors.map(err => err.message);
                console.log('Validation errors: ', errors);
            } else {
                console.error(error)
                error.message = 'Book not added';
                next(error);
            }
        }
    })();
})

module.exports = router;