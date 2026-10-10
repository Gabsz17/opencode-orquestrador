import { createServer } from "node:http";
const PORT = Number(process.env.PORT ?? 3000);
createServer((req, res) => {
  if (req.method === "GET" && new URL(req.url, "http://x").pathname === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ error: { code: "NOT_FOUND", message: "rota inexistente" } }));
}).listen(PORT, () => console.log(`ouvindo em ${PORT}`));
