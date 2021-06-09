// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const fetch = require('node-fetch');

module.exports = app;

app.use(express.static('dist'));

// Callback function to complete GET '/all'
app.get('/getData', (req, res) => {
    console.log('Retrieve projectData');
    res.send(projectData);
});

// Post Route
let data = [];

app.post('/addWeather', (req, res) => {
    console.log(req.body);
    projectData = {
        city: req.body.city,
        arrivalDate: req.body.arrival,
        departureDate: req.body.departure,
    };
    res.send(projectData);
});
