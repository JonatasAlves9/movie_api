"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const python_shell_1 = require("python-shell");
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: ["1414", "2323"],
    };
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