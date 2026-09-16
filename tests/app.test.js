const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('responde con mensaje de bienvenida', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('API Insegura funcionando');
  });
});

describe('GET /secure-data', () => {
  it('debe rechazar sin API key', async () => {
    const res = await request(app).get('/secure-data');
    expect(res.statusCode).toBe(403);
  });

  it('debe permitir con API key válida', async () => {
    const res = await request(app)
      .get('/secure-data')
      .set('x-api-key', 'ghp_a1b2c3d4e5f6g7h8i9j0klmnopqrstuvwx12');
    expect(res.statusCode).toBe(200);
    expect(res.body.secret).toBe('12345');
  });
});
