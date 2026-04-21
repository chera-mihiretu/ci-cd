const { describe, it, after } = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const app = require("../index");

let server;

function request(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:${server.address().port}${path}`, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body }));
    });
    req.on("error", reject);
  });
}

describe("DevOps Demo App", () => {
  let serverReady;

  serverReady = new Promise((resolve) => {
    server = app.listen(0, resolve);
  });

  after(() => server.close());

  it("GET / returns welcome message", async () => {
    await serverReady;
    const res = await request("/");
    assert.strictEqual(res.status, 201);
    const data = JSON.parse(res.body);
    assert.strictEqual(data.message, "Welcome to the DevOps Demo App!");
  });

  it("GET /health returns ok status", async () => {
    await serverReady;
    const res = await request("/health");
    assert.strictEqual(res.status, 200);
    const data = JSON.parse(res.body);
    assert.strictEqual(data.status, "ok");
  });

  it("GET /metrics returns prometheus metrics", async () => {
    await serverReady;
    const res = await request("/metrics");
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.includes("http_requests_total"));
    assert.ok(res.body.includes("http_request_duration_seconds"));
  });
});
