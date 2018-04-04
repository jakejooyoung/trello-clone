import request from 'supertest';
import app from '../../server';

describe('Users Route', () => {
  // Get all users
  // TO-DO: We should be redirecting to signin or signup or to users/:userId instead
  it('GET /users should show list of users', (done) => {
    request(app)
      .get('/users')
      .expect(200, done);
  });
  // Get user by userId
  it('GET /users/:userId should return user with userId.', (done) => {
    request(app)
      .get('/users/1')
      .expect(200, done);
  });
  afterAll((done) => {
    app.close();
    done();
  });
});
