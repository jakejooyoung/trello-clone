import request from 'supertest';
import app from '../../server';

describe('trello api', function() {
  it('returns hello world', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
  afterAll(done => {
		app.close();
		done();
	});
});