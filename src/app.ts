import express from "express";
import { PythonShell } from "python-shell";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  PythonShell.run("./scripts/script.py", null, function (err) {
    if (err) throw err;
    console.log("finished");
  });
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
