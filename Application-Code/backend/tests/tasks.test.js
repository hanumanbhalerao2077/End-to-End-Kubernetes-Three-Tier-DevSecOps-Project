const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../app");

test("GET /healthz returns 200", async () => {
  const response = await request(app).get("/healthz");
  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
});
