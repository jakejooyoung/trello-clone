import request from 'supertest';
import app from '../../server';

describe('Columns Route', () => {
  // Get all columns
  it('GET /columns should redirect to /users', (done) => {
    request(app)
      .get('/columns')
      .expect('Location', '/users')
      .expect(302, done);
  });
  // Get column by columnId
  it('GET /columns/:columnId should return board with columnId.', (done) => {
    request(app)
      .get('/columns/1')
      .expect(200, done);
  });
  it('GET boards/:boardId/columns should return columns with boardId', (done) => {
    request(app)
      .get('/boards/1/columns')
      .expect(200, done);
  });
  /**
  / NESTED ROUTES
  * */

  // Get all columns for user
  it('GET /users/:userId/columns should return all columns with userId.', (done) => {
    request(app)
      .get('/users/1/columns')
      .expect(200, done);
  });
  // Get all columns for board
  it('GET /boards/:boardId/columns should return all columns with boardId.', (done) => {
    request(app)
      .get('/boards/1/columns')
      .expect(200, done);
  });
  
  afterAll((done) => {
    app.close();
    done();
  });
});
