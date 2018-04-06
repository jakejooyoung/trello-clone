import request from 'supertest';
import app from '../../server';

describe('Tasks Route', () => {
  // Get all columns
  it('GET /tasks should redirect to /users', (done) => {
    request(app)
      .get('/tasks')
      .expect('Location', '/users')
      .expect(302, done);
  });
  // Get task by taskId
  it('GET /tasks/:taskId should return board with taskId.', (done) => {
    request(app)
      .get('/tasks/1')
      .expect(200, done);
  });

  /**
  / NESTED ROUTES
  * */

  // Get all tasks for user
  it('GET /users/:userId/tasks should return all tasks with userId.', (done) => {
    request(app)
      .get('/users/1/tasks')
      .expect(200, done);
  });
  // Get all tasks for board
  it('GET /boards/:boardId/tasks should return all tasks with boardId.', (done) => {
    request(app)
      .get('/boards/1/tasks')
      .expect(200, done);
  });
  // Get all tasks for column
  it('GET /columns/:columns/tasks should return all tasks with columnId.', (done) => {
    request(app)
      .get('/columns/1/tasks')
      .expect(200, done);
  });

  /**
  / POST REQUESTS
  * */
  it('POST request to /tasks with body should return 200 with valid Task id.', (done) => {
    request(app)
      .post('/tasks')
      .send({ title:"New Name",
              description:"New Board With New Name",
              userId:1,
              columnId:1,
              boardId:1 })
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  afterAll((done) => {
    app.close();
    done();
  });
});
