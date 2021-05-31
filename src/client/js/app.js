/* Global Variables */
const baseURL = 'http://api.geonames.org/searchJSON?';

/* Function called by event listener */
function generateCoords(e){
    const country = document.getElementById('country').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    getCoords (baseURL, city, geonamesApi_key)
    .then (function (country) {
        postData('/addCoords', {
            lat: latitude, long: longitude, country: country
            })
            .then(() => {
                updateUI()
            });
        });  
}

/* Function to GET Web API Data*/
const getCoords = async (baseURL, geonamesApi_key, query) => {
    // build URL into fetch call
    const res = await fetch(baseURL+geonamesApi_key+query);
    // call API
    try {
        const coordsData = await res.json();
        console.log(coordsData);
        return coordsData;
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
        const newCoordsData = await res.json();
        console.log(newCoordsData);
        return newCoordsData;
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
        document.getElementById('latitude').innerHTML = lastEntry["latitude"];
        document.getElementById('longitude').innerHTML = lastEntry["longitude"];
        document.getElementById('country').innerHTML = lastEntry["country"];
        } catch(error){
            console.log('error', error);
    }
};