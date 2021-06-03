// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'));

const port = 3000;
const server = app.listen(port, () => {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
});

// Callback function to complete GET '/all'
app.get('/getData', (req, res) => {
    console.log('Retrieve projectData');
    res.send(projectData);
});

// Post Route
app.post('/addCoords', (req, res) => {
    projectData = req.body;
    res.send(projectData);
    console.log(req.body);
});
