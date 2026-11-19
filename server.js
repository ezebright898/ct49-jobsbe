const http = require("http");
const port = process.env.PORT || 8080;
const srv = http.createServer((req, res) => {
  let u;
  try { u = new URL(req.url, "http://" + (req.headers.host || "localhost")); } catch (e) { u = { pathname: "/", searchParams: new Map() }; }
  if (u.pathname === "/r") {
    const to = (u.searchParams.get("to") || "");
    res.writeHead(302, { Location: to, "Cache-Control": "no-store" });
    return res.end("to=" + to);
  }
  if (u.pathname === "/healthz") { res.writeHead(200, {"content-type":"text/plain"}); return res.end("ok"); }
  res.writeHead(200, { "content-type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  res.end('<!doctype html><html><head><title>CT49-BE-ORIGIN</title></head><body><h1>CT49-BE-ORIGIN</h1><p>ct49 jobsbe origin relay</p></body></html>');
});
srv.listen(port, "0.0.0.0", () => console.log("listening " + port));
