const express = require('express');
const router = express.Router();

const db = require('../db');
const { Book } = db.models;

// renders update book form
router.get('/books/:id', (req, res) => {

    (async () => {
        try { 
            const book = await Book.findByPk(req.params.id)
            res.render('bookDeets', {book})

        } catch (error) {
            res.render('error')
        }
    })();
});

// posts update book form inputs
router.post('/books/:id', (req, res) => {

    (async () => {
        try { 
            const book = await Book.findByPk(req.params.id);
            await book.update(req.body)
            .then( () => {
                res.redirect('/');
            })

        } catch (error) {
            if (error.name === 'SequelizeValidationError') { 
                const errors = error.errors;
                const book = req.body;
                book.id = req.params.id;                
                res.render('bookDeets', {errors, book});
            } else {
                res.render('error');
            }
        }
    })();
})


// posts delete for selected book
router.post('/books/:id/delete', (req, res) => {
    (async () => {
        try { 
            const bookToDestroy = await Book.findByPk(req.params.id);
            await bookToDestroy.destroy()
            .then( () => {
                res.redirect('/');
            })
        } catch (error) {
            console.log("Sorry! The book could not be deleted.");
        }
    })();
})

module.exports = router;