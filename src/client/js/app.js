/* Global Variables */
const baseURL = 'http://api.geonames.org/searchJSON?';
const GEONAMES_API_KEY = 'galleriesofdreams';
const WEATHERBIT_API_KEY = '550e8dd7bdb54d85a5e34caf76964db8';
const weatherbitURL = 'http://api.weatherbit.io/v2.0/current';
const pixabayURL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '7629784-169a989d09016e0414f84402b';
const city = document.getElementById('city').value;

/* Function called by event listener */
export function generateCoords(e) {
    getCoords(baseURL, GEONAMES_API_KEY, city).then(function (addData) {
        const lat = data.geonames[0].lat;
        const lng = data.geonames[0].lng;
        postData('http://localhost:3000/addCoords', {
            city: city,
            lat: lat,
            lng: lng,
        });
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
const getWeather = async (weatherbitURL, WEATHERBIT_API_KEY, lat, lng) => {
    // build URL into fetch call
    const res = await fetch(
        weatherbitURL + '&lat' + lat + '&lon=' + lng + WEATHERBIT_API_KEY
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
const getPicture = async (pixabayURL, PIXABAY_API_KEY, city) => {
    // build URL into fetch call
    const res = await fetch(
        pixabayURL + PIXABAY_API_KEY + '&q=' + city + '&image_type=photo'
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

/* Function to update UI */

/* Function to POST data */
