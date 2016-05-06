// BASE SETUP
// =============================================================================

// call the external packages we need
var express = require('express');              // call express - Node framework to control web requests
var bodyParser = require('body-parser');       // call bodyParser - Allow us pull POST content from  HTTP request
var app = express();                           // define our app

// call the internal packages we need
var users = require('./routes/users');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 3000;


// ROUTES FOR OUR API
// =============================================================================
// middleware to use for all requests
app.use(function(req, res, next) {
    console.log(req.method + " " + req.url);
    next(); // make sure we go to the next routes and don't stop here
});

app.use('/', express.Router().get('/', function(req, res) {res.send("Server is running OK!!");}));
app.use('/users', users);


// START THE SERVER
// =============================================================================
app.listen(port, function () { console.log('RRC-BOOK app listening on port %s...', port); });

module.exports = app;