import express from "express";
import { PythonShell } from "python-shell";

interface Req {
  movie: string;
}

const app = express();
app.use(express.json());
const port = 3000;

app.post("/movieRecomendation", (req, res) => {
  const { movie } = req.body;
  const pyshell = new PythonShell("./scripts/script_get_recomendation.py", {
    args: [movie],
  });
  let result = "";
  pyshell.on("message", function (message) {
    result = message.replace(/'/g, '"');

    res.send(result);
  });

  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log("finished");
  });
});

app.get("/", (req, res) => {
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
