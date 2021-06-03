/* Global Variables */
const GEONAMES_API_KEY = 'galleriesofdreams';
const baseURL = 'http://api.geonames.org/searchJSON?';

/* Function called by event listener */
export function generateCoords(e) {
    const city = document.getElementById('city').value;
    const arrival = document.getElementById('arrival').value;
    const departure = document.getElementById('departure').value;
    getCoords(baseURL, GEONAMES_API_KEY, city).then(function (coordsData) {
        const latitude = coordsData.latitude;
        const longitude = coordsData.longitude;
        postData('http://localhost:3000/addCoords', {
            lat: coordsData.latitude,
            lng: coordsData.longitude,
            city: coordsData.city,
        }).then(() => {
            updateUI();
        });
    });
}

/* Function to GET Web API Data*/
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

/* Function to update UI */
export const updateUI = async () => {
    const request = await fetch('http://localhost:3000/getData');
    try {
        const allData = await request.json();
        document.getElementById('latitude').innerHTML = allData['latitude'];
        document.getElementById('longitude').innerHTML = allData['longitude'];
        document.getElementById('city').innerHTML = allData['city'];
    } catch (error) {
        console.log('error', error);
    }
};
