const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");

describe("Node Server Request createTask Function.", () => {
  it("Should answer POST requests for /api/tasks with a 200 status code", async () => {
    // given
    // username = test;
    const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDEwMjk3MjUsImV4cCI6MTY0MzYyMTcyNX0.6V0c77TqbpElBshZYWTXGhS4dWPdbhyBsXyYlt-0yfw";
    const data = {
      categoryId: "621e18e9a332958d126356fa",
      labelId: "621e1e1309d6a471e0e8f606",
      startTimestamp: new Date("Tue Mar 01 2022 21:30:39 GMT+0900 (한국 표준시)"),
      endTimestamp: new Date("Tue Mar 01 2022 22:30:39 GMT+0900 (한국 표준시)"),
      pauseAndRestarts: [],
      goalTime: "3600000",
      playTime: "3600000",
      memo: "test 완료",
      distraction: "nothing",
    }

    // when
    const { body, statusCode } = await request(app).post("/api/tasks").set("authorization", token).send(data);

    // then
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Ok");
  });

  it("Should 401 when ID isn\'t exists", async () => {
    // given
    // username = testtest
    const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R0ZXN0IiwiaWF0IjoxNjQxMDI5NzI1LCJleHAiOjE2NDM2MjE3MjV9.LzPxS16UfK1cKABQcm3KjS44I0Cn_LGw8k-6qIau1uQ";
    const data = {
      categoryId: "621e18e9a332958d126356fa",
      labelId: "621e1e1309d6a471e0e8f606",
      startTimestamp: new Date("Tue Mar 01 2022 21:30:39 GMT+0900 (한국 표준시)"),
      endTimestamp: new Date("Tue Mar 01 2022 22:30:39 GMT+0900 (한국 표준시)"),
      pauseAndRestarts: [],
      goalTime: "3600000",
      playTime: "3600000",
      memo: "test 완료",
      distraction: "nothing",
    }

    // when
    const { body, statusCode } = await request(app).post("/api/tasks").set("authorization", token).send(data);

    // then
    expect(statusCode).toEqual(401);
    expect(body.message).toEqual("Not Authorized");
  });

  done();
})

afterAll(() => mongoose.disconnect());
