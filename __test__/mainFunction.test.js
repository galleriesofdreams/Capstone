// Import the js file to test
import { generateCoords } from '../src/client/js/app';
// The describe() function
describe('Testing the API requests functionality', () => {
    // The test() function
    test('Testing the generateCoords() function', () => {
        expect(generateCoords).toBeDefined();
    });
});
