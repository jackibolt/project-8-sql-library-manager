
const express = require('express');
const router = express.Router();

const db = require('../db');
const { Book } = db.models;


router.get('/', (req, res) => {
    res.redirect('/books')
});

module.exports = router;