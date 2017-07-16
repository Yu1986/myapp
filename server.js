// server.js

// BASE SETUP
// =============================================================================
config = require('config');

var mongoose   = require('mongoose');
mongoose.connect(config.DBHost);

console.log(config.util.getEnv('NODE_ENV'));
console.log(config.DBHost);

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var swaggerUi = require('swagger-ui-express'); 
var swaggerJSDoc = require('swagger-jsdoc');

var options = { 
  swaggerDefinition: {
    info: {
      title: 'Bears', // Title (required) 
      version: '1.0.0', // Version (required) 
    },
  },
  apis: ['./app/routes/*.js'], // Path to the API docs 
};

var swaggerSpec = swaggerJSDoc(options);

app.get('/api-docs.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // line 45 

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
bear = require('./app/routes/bear')
router.route('/bears')
      .get(bear.getBears)
      .post(bear.postBears);

router.route('/bears/:bear_id')
    .get(bear.getBearById)
    .put(bear.update)
    .delete(bear.remove);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app; // for testing