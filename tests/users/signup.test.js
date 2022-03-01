const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");

describe("Node Server Request Signup Function.", () => {
  it("Should answer POST requests for /api/signup with a 200 status code", async () => {
    // given
    const data = {
      username: "test1",
      password: "test1",
      email: "test1@test.com",
    }

    // when
    const { body, statusCode } = await request(app).post("/api/users/signup").send(data);

    // then
    expect(statusCode).toEqual(201);
    expect(body.userInfo.username).toEqual("test1");
    expect(body.message).toEqual("Created");
  });

  it("Should 400 when ID's already exists", async () => {
    // given
    const data = {
      username: "test",
      password: "test1633",
      email: "test1633@test.com"
    }

    // when
    const { body, statusCode } = await request(app).post("/api/users/signup").send(data);

    // then
    expect(statusCode).toEqual(400);
    expect(body.message).toEqual("ID's already exists");
  });

  it("Should 400 when email's already exists", async () => {
    // given
    const data = {
      username: "test1633",
      password: "test1633",
      email: "test@test.com"
    }

    // when
    const { body, statusCode } = await request(app).post("/api/users/signup").send(data);

    // then
    expect(statusCode).toEqual(400);
    expect(body.message).toEqual("Email's already exists");
  });

  it("Should 400 when email's invalid", async () => {
    // given
    const data = {
      username: "test1",
      password: "test1",
      email: "test"
    }

    // when
    const { body, statusCode } = await request(app).post("/api/users/signup").send(data);

    // then
    expect(statusCode).toEqual(400);
    expect(body.message).toEqual("Email is invalid");
  });
})

afterAll(() => mongoose.disconnect());
