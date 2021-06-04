/* Global Variables */
const GEONAMES_API_KEY = 'galleriesofdreams';
const WEATHERBIT_API_KEY = '550e8dd7bdb54d85a5e34caf76964db8';
const baseURL = 'http://api.geonames.org/searchJSON?';
const weatherbitURL = 'http://api.weatherbit.io/v2.0/current';

/* Function called by event listener */
export function generateCoords(e) {
    const city = document.getElementById('city').value;
    const arrival = document.getElementById('arrival').value;
    const departure = document.getElementById('departure').value;
    getCoords(baseURL, GEONAMES_API_KEY, city).then(function (coordsData) {
        const lat = coordsData.lat;
        const lng = coordsData.lng;
        postData('http://localhost:3000/addCoords', {
            lat: coordsData.lat,
            lng: coordsData.lng,
            city: coordsData.city,
        }).then(() => {
            updateUI();
        });
    });
}

/* Function to GET Geonames API data*/
const getCoords = async (baseURL, GEONAMES_API_KEY, query) => {
    // build URL into fetch call
    const res = await fetch(
        baseURL + 'username=' + GEONAMES_API_KEY + '&q=' + query
    );
    // call API
    try {
        const coordsData = await res.json();
        console.log(coordsData);
        return coordsData;
        // handle error
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to POST data */
const postData = async (url = '', projectData = {}) => {
    const res = await fetch(url, {
        //boilerplate
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        //Body data type must match Content-Type
        body: JSON.stringify(projectData),
    });
};

/* Function to GET Weatherbit API data*/

/* Function to update UI */
export const updateUI = async () => {
    const request = await fetch('http://localhost:3000/getData');
    try {
        const coordsData = await request.json();
        document.getElementById('latitude').innerHTML = coordsData['latitude'];
        document.getElementById('longitude').innerHTML =
            coordsData['longitude'];
        document.getElementById('city').innerHTML = coordsData['city'];
    } catch (error) {
        console.log('error', error);
    }
};
