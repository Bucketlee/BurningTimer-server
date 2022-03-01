const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");

describe("Node Server Request FindId Function.", () => {
  it("Should answer POST requests for /api/help/id with a 200 status code", async () => {
    // given
    const data = {
      email: "test@test.com",
    }

    // when
    const { body, statusCode } = await request(app).post("/api/users/help/id").send(data);

    // then
    expect(statusCode).toEqual(200);
    expect(body.userInfo.username).toEqual("test");
    expect(body.message).toEqual("Ok");
  });

  it("Should 400 when ID's not found with that email", async () => {
    // given
    const data = {
      email: "testtest@test.com"
    }

    // when
    const { body, statusCode } = await request(app).post("/api/users/help/id").send(data);

    // then
    expect(statusCode).toEqual(400);
    expect(body.message).toEqual("Not found ID with that email");
  });
})

afterAll(() => mongoose.disconnect());
