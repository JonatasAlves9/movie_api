"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const python_shell_1 = require("python-shell");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
app.post("/movieRecomendation", (req, res) => {
    const { movie } = req.body;
    const pyshell = new python_shell_1.PythonShell("./scripts/script_get_recomendation.py", {
        args: [movie],
    });
    let result = "";
    pyshell.on("message", function (message) {
        result = message.replace(/'/g, '"');
        res.send(result);
    });
    pyshell.end(function (err, code, signal) {
        if (err)
            throw err;
        console.log("finished");
    });
});
app.get("/", (req, res) => {
    const pyshell = new python_shell_1.PythonShell("./scripts/script.py");
    let result = "";
    pyshell.on("message", function (message) {
        result = message.replace(/'/g, '"');
        console.log(JSON.parse(result));
        res.send(result);
    });
    pyshell.end(function (err, code, signal) {
        if (err)
            throw err;
        console.log("finished");
    });
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map