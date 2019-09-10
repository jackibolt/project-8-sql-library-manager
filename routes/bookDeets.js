const express = require('express');
const router = express.Router();

const db = require('../db');
const { Book } = db.models;


router.get('/books/:id', (req, res) => {

    (async () => {
        try { 
            const findBooks = await Book.findAll({});
            res.render('index', {findBooks})

        } catch (error) {
            if (error.name === 'SequelizeValidationError') { 
                const errors = error.errors.map(err => err.message);
                console.log('Validation errors: ', errors);
            } else {
                throw error;
            }
        }

    })();
});

module.exports = router;