import { generateWeather } from './js/app'

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateWeather);

export {
    generateWeather
}