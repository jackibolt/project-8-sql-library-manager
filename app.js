
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



/////// MAIN ERROR HANDLERS ////////

// 404 error handler
app.use((req, res, netxt) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

// renders error page
app.use(( err, req, res, next ) => {
    res.locals.error = err;
    res.status = err.status;
    if (res.status === undefined) {
        err.status = 500;
    }
    res.render('pageNotFound');
});

/////// END OF ERROR HANDLERS ///////



// starts the local server
app.listen(3000, () => {
    console.log("we're up and running on localhost:3000!");
});
