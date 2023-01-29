"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = exports.mulberry32 = void 0;
function mulberry32(seed) {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
exports.mulberry32 = mulberry32;
const RENDER_DIST = 500;
class Environment {
    constructor(cells = [], size = 1000, seed = Math.random()) {
        this.cells = cells;
        this.size = size;
        this.seed = seed;
        this.food = [];
        this.generator = mulberry32(seed);
        this.food = Array(500).fill([]).map(() => [
            this.generator() * this.size * (this.generator() > 0.5 ? 1 : -1),
            this.generator() * this.size * (this.generator() > 0.5 ? 1 : -1)
        ]);
    }
    addCell(cell) {
        this.cells.push(cell);
        cell.environment = this;
    }
    draw(p5, x, y) {
        const center = [p5.windowWidth / 2, p5.windowHeight / 2];
        const offset = [center[0] - x, center[1] + y];
        // Background
        p5.background(245, 245, 255);
        // Food
        this.food.filter(f => (Math.abs((f[0] - x) / (f[1] - y)) <= RENDER_DIST)).forEach(f => {
            p5.fill(100);
            p5.stroke(10);
            p5.strokeWeight(2);
            p5.circle(offset[0] + f[0], offset[1] - f[1], 10);
        });
        // Cells
        this.cells.forEach(c => c.draw(p5, offset[0], offset[1]));
    }
}
exports.Environment = Environment;
//# sourceMappingURL=environment.js.map