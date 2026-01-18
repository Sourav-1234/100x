const request = require('supertest');
const app = require('../src/app');

describe('Authentication Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        username: 'testuser',
        password: 'test123',
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
  });

  it('should login user and return token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'test123',
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });
});