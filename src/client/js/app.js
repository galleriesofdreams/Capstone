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
export async function generateCoords(e) {
    const city = document.getElementById('city').value;
    const arrival = document.getElementById('arrival').valueAsDate;
    const departure = document.getElementById('departure').valueAsDate;
    const countdown = getCountdown(arrival);
    const tripLength = getTripLength(arrival, departure);
    const geoData = await getCoords(baseURL, GEONAMES_API_KEY, city);
    const weatherData = await getWeather(
        weatherbitURL,
        WEATHERBIT_API_KEY,
        geoData.geonames[0].lat,
        geoData.geonames[0].lng
    );
    const picData = await getPicture(pixabayURL, PIXABAY_API_KEY, city);
    await postData('http://localhost:3000/addWeather', {
        city: city,
        arrivalDate: arrival,
        departureDate: departure,
        countdown: countdown,
        tripLength: tripLength,
        picture: picData,
    });
    updateUI();
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
const updateUI = async () => {
    const req = await fetch('http://localhost:3000/getData');
    try {
        const allData = await req.json();
        document.getElementById('picture').src = imageURL;
        document.getElementById('cityRes').innerHTML = allData.city;
        document.getElementById('departure').innerHTML = allData['departure'];
        document.getElementById('arrival').innerHTML = allData['arrival'];
    } catch (error) {
        console.log('error', error);
    }
};
