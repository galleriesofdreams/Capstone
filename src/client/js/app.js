'use strict';

import fetch from 'node-fetch';

/* Global Variables */
const baseURL = 'http://api.geonames.org/searchJSON?';
const GEONAMES_API_KEY = 'galleriesofdreams';
const WEATHERBIT_API_KEY = '550e8dd7bdb54d85a5e34caf76964db8';
const weatherbitURL = ' http://api.weatherbit.io/v2.0/forecast/daily?';
const pixabayURL = 'https://pixabay.com/api/?';
const PIXABAY_API_KEY = '7629784-169a989d09016e0414f84402b';

/* Function called by event listener */
export function generateCoords(e) {
    const city = document.getElementById('city').value;
    const arrival = document.getElementById('arrival').value;
    const departure = document.getElementById('departure').value;
    //const countdown = getCountdown(arrival);
    //const tripLength = getTripLength(arrival, departure);
    getCoords(baseURL, GEONAMES_API_KEY, city)
        .then(function (data) {
            return getWeather(
                weatherbitURL,
                WEATHERBIT_API_KEY,
                data.geonames[0].lat,
                data.geonames[0].lng
            );
        })
        .then(function (data) {
            return getPicture(pixabayURL, PIXABAY_API_KEY, city);
        })
        .then(function (data) {
            return postData('http://localhost:3000/addWeather', {
                City: data.city,
                arrivalDate: data.arrival,
                departureDate: data.departure,
            });
        })
        .then(() => {
            updateUI();
        });
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
    }
};

/*Function to add a countdown to trip start*/
function getCountdown(arrival) {
    const countdownDate = new Date(arrival).getTime();
    const now = new Date().getTime;
    const difference = countdownDate - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return days;
}

/*Function to determine length of trip*/
function getTripLength(arrival, departure) {
    const tripLengthSeconds = arrival.getTime() - departure.getTime();
    const tripLengthDays = tripLengthSeconds / (1000 * 3600 * 24);
    return tripLengthDays;
}

/* Function to POST data */
export const postData = async (url = '', data = {}) => {
    const res = await fetch('http://localhost:3000/addWeather', {
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
const updateUI = async () => {
    const req = await fetch('http://localhost:3000/getData');
    try {
        const allData = await req.json();
        //document.getElementById('picture').src = imageURL;
        document.getElementById('city').innerHTML = allData.city_name;
        document.getElementById('departure').innerHTML = allData['departure'];
        document.getElementById('arrival').innerHTML = allData['arrival'];
    } catch (error) {
        console.log('error', error);
    }
};
