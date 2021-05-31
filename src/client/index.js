import { generateCoords } from './js/app';
import '../client/styles/style.scss';

// Event listener to add function to existing HTML DOM element
document.getElementById('search').addEventListener('click', generateCoords);

export {
    generateCoords
}