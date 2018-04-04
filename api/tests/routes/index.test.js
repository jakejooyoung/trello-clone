import request from 'supertest';
import app from '../../server';

describe('Trello Mockup API index', () => {
  it('returns hello world', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
  afterAll((done) => {
    app.close();
    done();
  });
});
