/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
const apiKey = '&units=metric&appid=5c1405ed481a64d7eced83e04661eb67';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateWeather);

/* Function called by event listener */
function generateWeather(e){
    const city = document.getElementById('city').value;
    const feelings = document.getElementById('feelings').value;
    getWeather (baseURL, city, apiKey)
    .then (function (weatherData) {
        const temperature = weatherData.main.temp;
        const feeling = feelings;
        postData('/addWeather', {
            temp: temperature, date: newDate, feeling: feeling
            })
            .then(() => {
                updateUI()
            });
        });  
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, apiKey) => {
    // build URL into fetch call
    const res = await fetch(baseURL+zip+apiKey);
    // call API
    try {
        const weatherData = await res.json();
        console.log(weatherData);
        return weatherData;
    // handle error
    } catch(error) {
        console.log('error', error);
    }
}
/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        //boilerplate
        method: 'POST',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
        },
        //Body data type must match Content-Type
        body: JSON.stringify(data),
});
    try {
        const newWeatherData = await res.json();
        console.log(newWeatherData);
        return newWeatherData;
    } catch(error) {
        console.log('error', error);
    };
}

/* Function to GET Project Data */
const getData = async (url='') =>{
    const request = await fetch(url);
    try {
        const getData = await request.json()
    }
    catch(error){
        console.log('error', error);
    }
};

/* Function to update UI */
const updateUI = async () => {
    const request = await fetch('/getData');
    try{
        const lastEntry = await request.json();
        document.getElementById('date').innerHTML = lastEntry["date"];
        document.getElementById('temp').innerHTML = lastEntry["temp"];
        document.getElementById('content').innerHTML = lastEntry["feeling"];
        } catch(error){
            console.log('error', error);
    }
};