const app = require('../src/server/server.js');
const supertest = require('supertest');
const request = supertest(app);

it('Test express endpoint', async (done) => {
    const res = await request.get('/getData');
    expect(res.body).toBeDefined();
    done();
});
