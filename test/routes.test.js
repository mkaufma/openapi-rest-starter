import request from 'supertest';
import app from '../server/app.js';

describe('GET /isInteger', () => {
  it('should return 200', async () => {
    await request(app)
      .get('/isInteger?param=11')
      .expect(200);
  });

  it('should error not integer', async () => {
    await request(app).
    get('/isInteger?param=2.2')
        .expect(400);
  });
});
