import request from 'supertest';
import app from '../../server';

describe('Boards Route', () => {
  // TO-DO: Redirect GET requests for /boards to /signin.
  // Redirecting to /users for now.
  it('GET /boards should redirect to /users', done => {
      request(app)
        .get('/boards')
        .expect('Location', '/users')
        .expect(302, done)
  });
  it('GET /users/:userId/boards should return all boards with userId.', done => {
      request(app)
        .get('/users/1/boards')
        .expect(200, done)
  });
  it('GET /boards/:boardId should return board with boardId.', done => {
    request(app)
      .get('/boards/1')
      .expect(200, function(err, res) {
        done();
      });
  });
  afterAll(done => {
    app.close();
    done();
  });
});
