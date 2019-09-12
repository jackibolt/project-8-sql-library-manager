const express = require('express');
const router = express.Router();

const db = require('../db');
const { Book } = db.models;

// renders main books database
router.get('/books', (req, res) => {

    (async () => {
        try { 
            const books = await Book.findAll();
            res.render('index', {books})

        } catch (error) {
            res.render('error');
        }

    })();
});

module.exports = router;