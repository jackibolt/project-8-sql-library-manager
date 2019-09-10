
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
const { Book } = db.models;


const app = express();
app.use(bodyParser.json())

// sets static route and pug engine
app.set('view engine', 'pug');
app.use('/static', express.static(__dirname+'/public'));



//////// ROUTES ///////////
// index route
const index = require('./routes');
app.use(index);

// books route
const books = require('./routes/books');
app.use(books);

// new book
const newBook = require('./routes/newBook');
app.use(newBook);

// book deets
const bookDeets = require('./routes/bookDeets');
app.use(bookDeets);

/////// END OF ROUTES ///////




// starts the local server
app.listen(3000, () => {
    console.log("we're up and running on localhost:3000!");
});
