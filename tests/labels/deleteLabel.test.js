const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");

describe("Node Server Request deleteLabel Function.", () => {
  it("Should answer DELETE requests for /api/labels/:labelId with a 200 status code", async () => {
    // given
    // test1 LabelId
    const _id = "621e1e1309d6a471e0e8f606";
    // username = test;
    const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDEwMjk3MjUsImV4cCI6MTY0MzYyMTcyNX0.6V0c77TqbpElBshZYWTXGhS4dWPdbhyBsXyYlt-0yfw";

    // when
    const { body, statusCode } = await request(app).delete(`/api/labels/${_id}`).set("authorization", token);

    // then
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Ok");
  });

  it("Should 401 when ID isn\'t exists", async () => {
    // given
    // test1 labelId
    const _id = "621e1e1309d6a471e0e8f606";
    // username = testtest
    const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R0ZXN0IiwiaWF0IjoxNjQxMDI5NzI1LCJleHAiOjE2NDM2MjE3MjV9.LzPxS16UfK1cKABQcm3KjS44I0Cn_LGw8k-6qIau1uQ";

    // when
    const { body, statusCode } = await request(app).delete(`/api/labels/${_id}`).set("authorization", token).send(data);

    // then
    expect(statusCode).toEqual(401);
    expect(body.message).toEqual("Not Authorized");
  });
})

afterAll(() => mongoose.disconnect());
