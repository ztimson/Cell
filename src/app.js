"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const p5_1 = __importDefault(require("p5"));
require("/assets/styles/main.scss");
const cell_1 = require("./cell");
const environment_1 = require("./environment");
new p5_1.default((p5) => {
    const position = [0, 0];
    const player = new cell_1.Cell([0, 0], '');
    const environment = new environment_1.Environment([player]);
    let drag;
    p5.setup = () => {
        p5.createCanvas(document.body.offsetWidth, document.body.offsetHeight);
    };
    p5.draw = () => {
        environment.draw(p5, position[0], position[1]);
    };
    p5.windowResized = () => { p5.resizeCanvas(p5.windowWidth, p5.windowHeight); };
    p5.mousePressed = () => { drag = [p5.mouseX, p5.mouseY]; };
    p5.mouseReleased = () => { drag = null; };
    p5.mouseDragged = () => {
        if (drag) {
            position[0] += drag[0] - p5.mouseX;
            drag[0] = p5.mouseX;
            position[1] -= drag[1] - p5.mouseY;
            drag[1] = p5.mouseY;
        }
    };
});
//# sourceMappingURL=app.js.map