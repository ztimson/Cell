import P5 from "p5";
import "/assets/styles/main.scss";
import {Cell} from './cell';
import {Environment} from './environment';

new P5((p5: P5) => {
	const position = [0, 0];
	const player = new Cell([0, 0], '');
	const environment = new Environment([player]);

	let drag: [number, number] | null;

	p5.setup = () => {
		p5.createCanvas(document.body.offsetWidth, document.body.offsetHeight);
	}

	p5.draw = () => {
		environment.draw(p5, position[0], position[1]);
	};

	p5.windowResized = () => { p5.resizeCanvas(p5.windowWidth, p5.windowHeight); }

	p5.mousePressed = () => { drag = [p5.mouseX, p5.mouseY]; }
	p5.mouseReleased = () => { drag = null; }
	p5.mouseDragged = () => {
		if(drag) {
			position[0] += drag[0] - p5.mouseX;
			drag[0] = p5.mouseX;
			position[1] -= drag[1] - p5.mouseY;
			drag[1] = p5.mouseY;
		}
	}
});
