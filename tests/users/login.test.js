const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");

describe("Node Server Request Login Function.", () => {
  it("Should answer POST requests for /api/login with a 200 status code", async () => {
    // given
    const data = {
      username: "test",
      password: "test1633",
    }

    // when
    const { body, statusCode } = await request(app).post("/api/users/login").send(data);

    // then
    expect(statusCode).toEqual(200);
    expect(body.userInfo.username).toEqual("test");
    expect(body.message).toEqual("Ok");
  });

  it("Should 401 when ID isn\'t exists", async () => {
    // given
    const data = {
      username: "tests",
      password: "tests",
    }

    // when
    const { body, statusCode } = await request(app).post("/api/users/login").send(data);

    // then
    expect(statusCode).toEqual(401);
    expect(body.message).toEqual("Please, Check your ID");
  });

  it("Should 401 when password is incorrect", async () => {
    // given
    const data = {
      username: "test",
      password: "test",
    }

    // when
    const { body, statusCode } = await request(app).post("/api/users/login").send(data);

    // then
    expect(statusCode).toEqual(401);
    expect(body.message).toEqual("Please, Check your password");
  });
})

afterAll(() => mongoose.disconnect());
