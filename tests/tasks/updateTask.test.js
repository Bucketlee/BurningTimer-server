const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");

describe("Node Server Request updateLabel Function.", () => {
  it("Should answer PATCH requests for /api/tasks/:taskId with a 200 status code", async () => {
    // given
    const _id = "621e1e6809d6a471e0e8f607";
    // username = test;
    const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDEwMjk3MjUsImV4cCI6MTY0MzYyMTcyNX0.6V0c77TqbpElBshZYWTXGhS4dWPdbhyBsXyYlt-0yfw";
    const data = {
      memo: "test 변경 완료",
      distraction: "유튜브 시청",
    }

    // when
    const { body, statusCode } = await request(app).patch(`/api/tasks/${_id}`).set("authorization", token).send(data);

    // then
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Ok");
  });

  it("Should 401 when ID isn\'t exists", async () => {
    // given
    const _id = "621e1e6809d6a471e0e8f607";
    // username = testtest
    const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R0ZXN0IiwiaWF0IjoxNjQxMDI5NzI1LCJleHAiOjE2NDM2MjE3MjV9.LzPxS16UfK1cKABQcm3KjS44I0Cn_LGw8k-6qIau1uQ";
    const data = {
      memo: "test 변경 완료",
      distraction: "유튜브 시청",
    }

    // when
    const { body, statusCode } = await request(app).patch(`/api/tasks/${_id}`).set("authorization", token).send(data);

    // then
    expect(statusCode).toEqual(401);
    expect(body.message).toEqual("Not Authorized");
  });
})

afterAll(() => mongoose.disconnect());
