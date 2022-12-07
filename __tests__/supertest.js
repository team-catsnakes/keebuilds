const request = require('supertest');
const server = 'http://localhost:3000/api';
const { expect, toBeDefined } = require('chai');

//REGISTERING A NEW USER: POST USER- CREATE NEW USER
//the parent describes a series of tests, starting with status 200 + content type verified
describe('Route intergration', () => {
  describe('/signup', () => {
    describe('POST', () => {
      it('responds with 200 status', () => {
        request(server).post('/users').expect(200, 'done');
      });
      // it('should specify json as the content type in the http header', async () => {
      //   const response = await request(server)
      //     .post('/users')
      //     .send({ username: 'catsnakes', password: 'catsnakes2022' })
      //     .expect(response.headers['content-type'])
      //     .toEqual(expect.stringContaining('json'));
      // });
      // it('should contain a username in the response body', async () => {
      //   const response = await request(server).post('/users').send({
      //     username: 'username',
      //     password: 'password',
      //   });
      //   expect(response.body.username).exists();
      // });
    });
  });

  //LOGIN: GET USER TEST, COMPARE INPUT TO DB
  describe('Route intergration', () => {
    describe('/users', () => {
      describe('GET', () => {
        it('response w 200 status and text/html content', () => {
          request(server)
            .get('/users')
            .expect('Content-Type', /text\/html/)
            .expect(200, 'done');
        });
        //it('should return content type of json', () => {
        // request(server)
        // .get('users')
        // .expect('Content-Type', /json)
        // });
        // it('should match to an existing user account_id'), () => {
        // request(server)
        // .get('/users')
        // .db should contain username
        // });
        // test('username should match database password', () => {
        //   return request(server)
        //     .get('/')
        //     .expect password at username to to match database;
        // });
      });
    });
  });
});
