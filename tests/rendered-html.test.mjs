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

test("server-renders Junhan Wang's academic homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const navigation = html.match(/<nav[\s\S]*?<\/nav>/)?.[0] ?? "";
  assert.match(html, /<title>Junhan Wang | 王俊翰<\/title>/i);
  assert.doesNotMatch(html, /Embodied AI|Research in embodied intelligence/);
  assert.match(html, /href="[^"]*\/favicon\.svg"/);
  assert.match(html, /href="[^"]*\/favicon\.ico"/);
  assert.match(html, /href="[^"]*\/apple-touch-icon\.png"/);
  assert.doesNotMatch(navigation, /Research|Experience|Honors/);
  assert.doesNotMatch(html, /CFCS · Peking University/);
  assert.match(html, /spending my gap year as a Research Assistant/);
  assert.match(html, /王俊翰/);
  assert.match(html, /agentic robot learning/);
  assert.match(html, /Ph\.D\. or M\.Phil\. opportunities starting in Spring or Fall 2027/);
  assert.match(html, /Research &amp; Publications/);
  assert.doesNotMatch(html, /Selected work|Training &amp; education|Recognition/);
  assert.match(html, /OpenDexGrasp/);
  assert.match(html, /HiPolicy/);
  assert.match(html, /ESI-VLA/);
  assert.equal((html.match(/In submission 2026/g) ?? []).length, 2);
  assert.doesNotMatch(html, /Conference on Robot Learning \(CoRL\)|Submitted/);
  assert.match(html, /\/opendexgrasp-teaser\.jpg/);
  assert.match(html, /\/esi-vla-teaser\.jpg/);
  assert.doesNotMatch(html, /paper-chip|>C3|>C2|>C1/);
  assert.match(html, /paper-visual-shell/);
  assert.match(html, /paper-pan-image/);
  assert.match(html, /paper-preview-overlay/);
  assert.match(html, /abstract-toggle/);
  assert.equal((html.match(/class="abstract-toggle"[^>]*aria-expanded="true"/g) ?? []).length, 3);
  assert.doesNotMatch(html, /<details|<summary/);
  assert.match(html, /Experience/);
  assert.match(html, /Research/);
  assert.match(html, /Education/);
  assert.match(html, /https:\/\/cfcs\.pku\.edu\.cn\/english\//);
  assert.match(html, /https:\/\/seit\.sysu\.edu\.cn\//);
  assert.match(html, /CFCS<\/a> · Advised by <a href="https:\/\/zsdonghao\.github\.io\/">Prof\. Hao Dong<\/a>/);
  assert.doesNotMatch(html, /CFCS<\/a> · Robot Learning/);
  assert.equal((html.match(/class="timeline-date"/g) ?? []).length, 2);
  assert.match(html, /Jul\. 2025—Present · Beijing, China/);
  assert.match(html, /Sep\. 2020—Jun\. 2025 · Guangzhou, China/);
  assert.match(html, /\/pku\.png/);
  assert.match(html, /\/sysu\.png/);
  assert.match(html, />Honors</);
  assert.match(html, /honors-list/);
  assert.match(html, /<strong>Outstanding Graduate in SYSU, Top 5%<\/strong>/);
  assert.match(html, /<strong>National Scholarship ×2, Top 1%<\/strong>/);
  assert.match(html, /The First-Class Scholarship in SYSU/);
  assert.match(html, /Funded by Lin Bin, the co-founder of Xiaomi Corporation and an alumnus of SEIT/);
  assert.match(html, /honors-note/);
  assert.match(html, /https:\/\/www\.sysu\.edu\.cn\/news\/info\/1881\/1150121\.htm/);
  assert.doesNotMatch(html, /honors-grid/);
  assert.doesNotMatch(html, /Junhan_Wang_CV\.pdf|>CV</);
  assert.match(html, /WQlEOv0AAAAJ/);
  assert.match(html, /WeChat/);
  assert.doesNotMatch(html, /Programming|DeepSpeed|MANUS Metagloves/);
  assert.match(html, /\/og_v2\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Building your site/i);
});
