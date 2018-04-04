import request from 'supertest';
import app from '../../server';

describe('Boards Route', () => {
  // Get all boards
  it('GET /boards should redirect to /users', (done) => {
    request(app)
      .get('/boards')
      .expect('Location', '/users')
      .expect(302, done);
  });
  // Get board by boardId
  it('GET /boards/:boardId should return board with boardId.', (done) => {
    request(app)
      .get('/boards/1')
      .expect(200, done);
  });

  /**
  / NESTED ROUTES
  * */

  // Get all boards for user
  it('GET /users/:userId/boards should return all boards with userId.', (done) => {
    request(app)
      .get('/users/1/boards')
      .expect(200, done);
  });
  afterAll((done) => {
    app.close();
    done();
  });
});
