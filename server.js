#!/usr/bin/env node
// server.js - Servidor MCP en Node.js como router de microservicios
// Comunicación: stdio (Claude envía JSON por stdin, recibe JSON por stdout)

const { spawn } = require("child_process");

function routeRequest(data) {
  if (data.type === "generate") {
    const py = spawn("python", ["server.py"]);
    py.stdin.write(JSON.stringify(data) + "\n");
    py.stdout.on("data", (out) => {
      process.stdout.write(out);
    });
  } else if (data.type === "audit") {
    const ps = spawn("powershell", ["-File", "server.ps1"]);
    ps.stdin.write(JSON.stringify(data) + "\n");
    ps.stdout.on("data", (out) => {
      process.stdout.write(out);
    });
  } else {
    process.stdout.write(JSON.stringify({ status: "error", message: "Tipo desconocido" }) + "\n");
  }
}

process.stdin.on("data", (chunk) => {
  try {
    const data = JSON.parse(chunk.toString());
    routeRequest(data);
  } catch (err) {
    process.stdout.write(JSON.stringify({ status: "error", message: err.message }) + "\n");
  }
});

console.log("Node MCP router iniciado");
