import express from "express";
import { PythonShell } from "python-shell";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    args: ["1414", "2323"],
  };

  const pyshell = new PythonShell("./scripts/script.py");
  let result = "";
  pyshell.on("message", function (message) {
    result = message.replace(/'/g, '"');
    console.log(JSON.parse(result));

    res.send(result);
  });

  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log("finished");
  });
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
