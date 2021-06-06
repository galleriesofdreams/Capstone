const app = require('./app');

const port = 3000;
const server = app.listen(port, () => {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
});
