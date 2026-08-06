import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the academic homepage template", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Your Name · Academic Homepage<\/title>/i);
  assert.match(html, /Recent Research/);
  assert.match(html, /Learning Structured World Models/);
  assert.match(html, /Experience/);
  assert.match(html, /Academic community/);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Building your site/i);
});
