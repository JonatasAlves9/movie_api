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
    python_shell_1.PythonShell.run("./scripts/script.py", null, function (err) {
        if (err)
            throw err;
        console.log("finished");
    });
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map