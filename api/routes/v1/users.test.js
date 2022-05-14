const supertest = require('supertest')
const request = supertest(require('../../app'))
const jwt  = require('jsonwebtoken');
const createUsers = require('../../fixtures/users.fixtures');
const UserModel = require('../../models/user.js')

let token;

beforeEach((done) => {

    let passwordTest = '123456';

    // implémenter les fixtures puis utiliser le mail + mdp dans le login ci-dessous
   request.post('/v1/users/register')
        .set("Content-Type", "application/json")
        .send({
            name: "Edouard1",
            firstname: "Gcht1",
            email: 'ed1@gmail.com',
            password: passwordTest,
            role: "admin"
        })
        .end((err, response) => {
            done();
        });
    request.post('/v1/users/register')
        .set("Content-Type", "application/json")
        .send({
            name: "Edouard2",
            firstname: "Gcht1",
            email: 'ed2@gmail.com',
            password: passwordTest,
            role: "admin"
        })
        .end((err, response) => {
            done();
        });

    request.post("/v1/users/login")
        .set("Content-Type", "application/json")
        .send({
            email: 'ed1@gmail.com',
            password: passwordTest,
        }).then((data) => {
            token = data.body.access_token;
        })

});


afterEach( async () => {
    await UserModel.deleteMany({});
})


describe('test return users', () => {

  it("should create a new user", async () => {
      const email = 'ed3@gmail.com'
      const response = await request.post("/v1/users/register")
          .set("Content-Type", "application/json")
          .send({
              name: "Edouard2",
              firstname: "Gcht2",
              email: email,
              password: "123456",
              role: "admin"
          });
      expect(response.status).toBe(201);
      expect(response.body.email).toBe(email);
  });

  it("should login user", async () => {
        const email = 'ed2@gmail.com'
        const response = await request.post("/v1/users/login")
            .set("Content-Type", "application/json")
            .send({
                email: email,
                password: "123456",
            });
        expect(response.status).toBe(200);
    });

  it("should return one user", async () => {
      const response = await request.get("/v1/users/Edouard1")
        .set("Authorization", "Bearer " + token)
      expect(response.status).toBe(200);
  });

  it("should update one user", async () => {
        const response = await request.put("/v1/users/update/Edouard1")
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + token)
            .send({
                name     : "Edouard1",
                firstname: "Gcht2",
                email    : "ed3@gmail.com",
                password: "123456",
                role: "admin"
            });
        expect(response.status).toBe(200);
    });

    it("should return all users", async () => {
        const response = await request.get("/v1/users/")
            .set("Authorization", "Bearer " + token)
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it("should delete an user", async () => {
        const response = await request.delete("/v1/users/delete/Edouard1")
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + token)
        expect(response.status).toBe(200);
    });
})