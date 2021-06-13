import { generateCoords } from './js/app';
import { getWeather } from './js/app';
import { postData } from './js/app';
import '../client/styles/style.scss';
import favicon from '../client/media/favicon.png';

// Loading weather icons
function importAll(r) {
    return r.keys().map(r);
}
importAll(require.context('./media/icons', false, /\.(png)$/));

export { generateCoords, getWeather, postData };
