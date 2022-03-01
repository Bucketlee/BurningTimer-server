const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");

describe("Node Server Request createLabel Function.", () => {
  it("Should answer POST requests for /api/labels with a 200 status code", async () => {
    // given
    // username = test;
    const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDEwMjk3MjUsImV4cCI6MTY0MzYyMTcyNX0.6V0c77TqbpElBshZYWTXGhS4dWPdbhyBsXyYlt-0yfw";
    const data = {
      categoryId: "test2",
      name: "test2",
      priority: "1",
    }

    // when
    const { body, statusCode } = await request(app).post("/api/labels").set("authorization", token).send(data);

    // then
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Ok");
  });

  it("Should 401 when ID isn\'t exists", async () => {
    // given
    // username = testtest
    const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R0ZXN0IiwiaWF0IjoxNjQxMDI5NzI1LCJleHAiOjE2NDM2MjE3MjV9.LzPxS16UfK1cKABQcm3KjS44I0Cn_LGw8k-6qIau1uQ";
    const data = {
      categoryId: "test2",
      name: "test2",
      priority: "1",
    }

    // when
    const { body, statusCode } = await request(app).post("/api/labels").set("authorization", token).send(data);

    // then
    expect(statusCode).toEqual(401);
    expect(body.message).toEqual("Not Authorized");
  });

  it("Should 400 when label is already exists", async () => {
    // given
    // username = test
    const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDEwMjk3MjUsImV4cCI6MTY0MzYyMTcyNX0.6V0c77TqbpElBshZYWTXGhS4dWPdbhyBsXyYlt-0yfw";
    const data = {
      categoryId: "test1",
      name: "test1",
      priority: "1",
    }

    // when
    const { body, statusCode } = await request(app).post("/api/labels").set("authorization", token).send(data);

    // then
    expect(statusCode).toEqual(400);
    expect(body.message).toEqual("This label is already exists");
  });

  done();
})

afterAll(() => mongoose.disconnect());
