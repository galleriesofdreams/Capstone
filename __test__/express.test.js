const app = require('../src/server/app.js');
const supertest = require('supertest');
const request = supertest(app);

it('Test express endpoint', async () => {
    const res = await request.get('/getData');
    return res;
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined;
});
