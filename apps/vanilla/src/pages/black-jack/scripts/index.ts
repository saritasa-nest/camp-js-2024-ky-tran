import { selectElement } from './utils/elements';
import { App } from './controllers/app';

window.onload = function() {
	const app = new App();

	selectElement('.make-move').onclick = function() {
		app.run();
	};

	document.onkeydown = function(event) {
		if (event.code === 'Enter') {
			app.run();
		}
	};
};
