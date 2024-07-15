import { selectElement } from './utils/elements';
import { App } from './controllers/app';

window.onload = function() {
	const app = new App();

	const mainButton = selectElement('.make-a-move');

	if (mainButton) {
		mainButton.onclick = function() {
			app.run();
		};
	}
};
