'use strict';

import fetch from 'node-fetch';

/* Global Variables */
// Geonames data
const baseURL = 'http://api.geonames.org/searchJSON?';
const GEONAMES_API_KEY = 'galleriesofdreams';

//Weatherbit data
const WEATHERBIT_API_KEY = '550e8dd7bdb54d85a5e34caf76964db8';
const weatherbitForecast = ' http://api.weatherbit.io/v2.0/forecast/daily?';
const weatherbitCurrent = 'http://api.weatherbit.io/v2.0/current?';
let weatherbitURL = '';

//Pixabay data
const pixabayURL = 'https://pixabay.com/api/?';
const PIXABAY_API_KEY = '7629784-169a989d09016e0414f84402b';

// Event listener to add function to existing HTML DOM element
document.getElementById('search').addEventListener('click', generateCoords);

/* Function called by event listener */
export async function generateCoords(e) {
    e.preventDefault();
    const city = document.getElementById('city').value;
    const arrival = document.getElementById('arrival').valueAsDate;
    const departure = document.getElementById('departure').valueAsDate;
    const countdown = getCountdown(arrival);
    const tripLength = getTripLength(arrival, departure);

    if (countdown <= 7) {
        weatherbitURL = weatherbitCurrent;
    } else {
        weatherbitURL = weatherbitForecast;
    }
    const geoData = await getCoords(baseURL, GEONAMES_API_KEY, city);
    const weatherData = await getWeather(
        weatherbitURL,
        WEATHERBIT_API_KEY,
        geoData.geonames[0].lat,
        geoData.geonames[0].lng
    );
    const picData = await getPicture(pixabayURL, PIXABAY_API_KEY, city);
    await postData('http://localhost:3000/addWeather', {
        weatherData: weatherData,
        cityRes: city,
        arrivalDate: arrival,
        departureDate: departure,
        days: countdown,
        tripLength: tripLength,
        picture: picData,
    });
    updateUI(picData.hits[0].webformatURL);
}

/* Function to GET Geonames API data*/
const getCoords = async (baseURL, GEONAMES_API_KEY, city) => {
    // build URL into fetch call
    const res = await fetch(
        baseURL + 'username=' + GEONAMES_API_KEY + '&q=' + city
    );
    // call API
    try {
        const data = await res.json();
        console.log(data);
        return data;
        // handle error
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to GET Weatherbit API data*/
export const getWeather = async (
    weatherbitURL,
    WEATHERBIT_API_KEY,
    lat,
    lng
) => {
    // build URL into fetch call
    const res = await fetch(
        weatherbitURL +
            'lat=' +
            lat +
            '&lon=' +
            lng +
            '&key=' +
            WEATHERBIT_API_KEY
    );
    // call API
    try {
        const data = await res.json();
        console.log(data);
        return data;
        // handle error
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to GET Pixabay API data*/
const getPicture = async (pixabayURL, PIXABAY_API_KEY, city) => {
    // build URL into fetch call
    const res = await fetch(
        pixabayURL +
            'key=' +
            PIXABAY_API_KEY +
            '&q=' +
            city +
            '&image_type=photo'
    );
    // call API
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('error', error);
        alert(`Can't find your destination!`);
    }
};

/*Function to add a countdown to trip start*/
function getCountdown(arrival) {
    const countdownDate = new Date(arrival).getTime();
    const now = new Date().getTime();
    const difference = countdownDate - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return days;
}

/*Function to determine length of trip*/
function getTripLength(arrival, departure) {
    const tripLengthSeconds = departure.getTime() - arrival.getTime();
    const tripLengthDays = tripLengthSeconds / (1000 * 3600 * 24);
    return tripLengthDays;
}

/* Function to POST data */
export const postData = async (url = '', data = {}) => {
    console.log('Data is: ', data);
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
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to update UI */
const updateUI = async (webformatURL) => {
    const req = await fetch('http://localhost:3000/getData');
    try {
        const allData = await req.json();
        document.getElementById('picture').src = webformatURL;
        document.getElementById('picture').alt = allData.cityRes;
        document.getElementById('cityRes').innerHTML =
            "Your trip's destination is: " + allData.cityRes;
        document.getElementById('days').innerHTML =
            'Only ' + allData.days + ' days to go!';
        document.getElementById('tripLength').innerHTML =
            'Your trip will last ' + allData.tripLength + ' days';
        if (allData.days <= 7) {
            document.getElementById('currentWeather').innerHTML =
                'Current weather is: ' +
                allData.weatherData.data[0].temp +
                '°F';

            const icon = document.createElement('img');
            icon.setAttribute('id', 'icon');
            icon.src =
                './src/client/media/icons/' +
                allData.weatherData.data[0].weather.icon +
                '.png';
            icon.alt = 'weather icon';

            document.getElementById('currentWeather').appendChild(icon);
        } else {
            document.getElementById('weatherForecast').innerHTML =
                '10 day weather forecast: ';
            for (var i = 0; i < 10; i++) {
                const weatherForecast =
                    document.getElementById('weatherForecast');

                const date = document.createElement('div');
                date.setAttribute('id', 'day');
                date.textContent = allData.weatherData.data[i].datetime;

                const highTemp = document.createElement('div');
                highTemp.setAttribute('id', 'highTemp');
                highTemp.textContent =
                    'Max temp ' + allData.weatherData.data[i].high_temp;

                const lowTemp = document.createElement('div');
                lowTemp.setAttribute('id', 'lowTemp');
                lowTemp.textContent =
                    'Min temp ' + allData.weatherData.data[i].low_temp;

                const icon = document.createElement('img');
                icon.setAttribute('id', 'icon');
                icon.src =
                    './src/client/media/icons/' +
                    allData.weatherData.data[i].weather.icon +
                    '.png';
                icon.alt = 'weather icon';

                weatherForecast.appendChild(date);
                weatherForecast.appendChild(highTemp);
                weatherForecast.appendChild(lowTemp);
                weatherForecast.appendChild(icon);
            }
        }
    } catch (error) {
        console.log('error', error);
    }
};
