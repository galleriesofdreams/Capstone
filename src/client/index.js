import { generateWeather } from './js/app'


import './styles/style.scss'

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateWeather);

export {
    generateWeather
}