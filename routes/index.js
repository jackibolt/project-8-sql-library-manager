
const express = require('express');
const router = express.Router();

const db = require('../db');
const { Book } = db.models;

// redirects home route to '/books' route
router.get('/', (req, res) => {
    res.redirect('/books')
});

module.exports = router;