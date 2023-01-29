import P5 from "p5";

export interface CellApi{
	move: {
		down: () => void;
		left: () => void;
		right: () => void;
		up: () => void;
	}
}

const MAX_CELL_SIZE = 100;

export class Cell {
	energy: number = 100;
	cellWall: number = 5;

	get dead() { return this.energy <= 20; }
	get size() { return Math.min(MAX_CELL_SIZE, 50 * (this.energy / 100)) }

	constructor(private pos: [number, number], private script: string = '') { }

	api: CellApi = {
		move: {
			down: () => this.move(0, -1),
			left: () => this.move(-1, 0),
			right: () => this.move(1, 0),
			up: () => this.move(0, 1)
		}
	}

	draw(p5: P5, offsetX: number, offsetY: number) {
		if(!this.dead) this.run();
		p5.fill(100, 100, 200);
		p5.stroke(150, 150, 255);
		p5.strokeWeight(this.cellWall);
		p5.circle(offsetX + this.pos[0], offsetY - this.pos[1], this.size);
	}

	move(x: number, y: number) {
		const energyCost = Math.round(this.size / 25 * 10) / 10;
		if(this.energy - energyCost <= 20) return;
		this.energy -= energyCost;
		this.pos[0] += x;
		this.pos[1] += y;
 	}

	run() {
		if(!this.script) return;
		const script = `${this.script}; run(this);`;
		return function() { return eval(script); }.call(this.api);
	}
}
