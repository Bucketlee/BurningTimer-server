const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");

describe("Node Server Request deleteCategory Function.", () => {
  it("Should answer DELETE requests for /api/categories/:categoryId with a 200 status code", async () => {
    // given
    // test1 categoryId
    const _id = "621e18e9a332958d126356fa";
    // username = test;
    const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDEwMjk3MjUsImV4cCI6MTY0MzYyMTcyNX0.6V0c77TqbpElBshZYWTXGhS4dWPdbhyBsXyYlt-0yfw";

    // when
    const { body, statusCode } = await request(app).delete(`/api/categories/${_id}`).set("authorization", token);

    // then
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Ok");
  });

  it("Should 401 when ID isn\'t exists", async () => {
    // given
    // test1 categoryId
    const _id = "621e18e9a332958d126356fa";
    // username = test;
    const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDEwMjk3MjUsImV4cCI6MTY0MzYyMTcyNX0.6V0c77TqbpElBshZYWTXGhS4dWPdbhyBsXyYlt-0yfw";

    // when
    const { body, statusCode } = await request(app).delete(`/api/categories/${_id}`).set("authorization", token).send(data);

    // then
    expect(statusCode).toEqual(401);
    expect(body.message).toEqual("Not Authorized");
  });
})

afterAll(() => mongoose.disconnect());
