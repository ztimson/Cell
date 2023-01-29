"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
const MAX_CELL_SIZE = 100;
class Cell {
    constructor(pos, script = '') {
        this.pos = pos;
        this.script = script;
        this.energy = 100;
        this.cellWall = 5;
        this.api = {
            move: {
                down: () => this.move(0, -1),
                left: () => this.move(-1, 0),
                right: () => this.move(1, 0),
                up: () => this.move(0, 1)
            }
        };
    }
    get dead() { return this.energy <= 20; }
    get size() { return Math.min(MAX_CELL_SIZE, 50 * (this.energy / 100)); }
    draw(p5, offsetX, offsetY) {
        if (!this.dead)
            this.run();
        p5.fill(100, 100, 200);
        p5.stroke(150, 150, 255);
        p5.strokeWeight(this.cellWall);
        p5.circle(offsetX + this.pos[0], offsetY - this.pos[1], this.size);
    }
    move(x, y) {
        const energyCost = Math.round(this.size / 25 * 10) / 10;
        if (this.energy - energyCost <= 20)
            return;
        this.energy -= energyCost;
        this.pos[0] += x;
        this.pos[1] += y;
    }
    run() {
        if (!this.script)
            return;
        const script = `${this.script}; run(this);`;
        return function () { return eval(script); }.call(this.api);
    }
}
exports.Cell = Cell;
//# sourceMappingURL=cell.js.map