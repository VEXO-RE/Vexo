const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

const logFile = "C:/Users/HP-Home/Downloads/logs/duplicaciones-runtime.log";

app.post("/log", (req, res) => {
  fs.appendFileSync(logFile, req.body.log + "\n");
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Servidor de logs activo en http://localhost:3000"));
