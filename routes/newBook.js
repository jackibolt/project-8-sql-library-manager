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

// adds book to database
router.post('/books/new', (req, res) => {

    (async () => {
        try { 
            const newBook = await Book.create({
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                year: req.body.year,
            })
            res.redirect('/');

        } catch (error) {
            // re-renders form with error message and req.body info
            if (error.name === 'SequelizeValidationError') { 
                const errors = error.errors;
                const book = req.body;
                book.id = req.params.id;                
                res.render('newBook', {errors, book});
            } else {
                res.render('error')
            }
        }
    })();
})

module.exports = router;