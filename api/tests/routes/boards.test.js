import request from 'supertest';
import app from '../../server';

describe('Boards Route', () => {
  /**
  / BASIC ROUTES
  * */

  // it('GET /boards should redirect to /users', (done) => {
  //   request(app)
  //     .get('/boards')
  //     .expect('Location', '/users')
  //     .expect(302, done);
  // });

  it('GET /boards/:boardId should return board with boardId.', (done) => {
    request(app)
      .get('/boards/1')
      .expect(200, done);
  });

  /**
  / NESTED ROUTES
  * */

  it('GET /users/:userId/boards should return all boards with userId.', (done) => {
    request(app)
      .get('/users/1/boards')
      .expect(200, done);
  });

  /**
  / POST REQUESTS
  * */

  it('POST request to /boards with body should return 200 with Board object.', (done) => {
    request(app)
      .post('/boards')
      .send({ title:"New Name",
              description:"New Board With New Name",
              userId:1, })
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  afterAll((done) => {
    app.close();
    done();
  });
});
