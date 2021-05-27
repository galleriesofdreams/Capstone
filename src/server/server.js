// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
const dotenv = require('dotenv');

dotenv.config();
const geonamesApi_key = process.env.GEONAMES_USERNAME;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));
const port = 3000;

// Spin up the server
const server = app.listen(port, () => {
    console.log('server running'); 
    console.log(`running on localhost: ${port}`);
})
// Callback to debug

// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get('/getData', (req, res) => {
    console.log('Retrieve projectData');
    res.send(projectData);
});

// Post Route
let data = [];

app.post('/addWeather', (req, res) => {
    console.log(req.body);
    projectData = req.body;
    res.send(projectData);
});


