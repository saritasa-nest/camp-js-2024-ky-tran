import { $ } from './utils';
import { App } from './controllers';

window.onload = function() {
	const app = new App();

	const mainButton = $('.make-a-move');

	if (mainButton) {
		mainButton.onclick = function() {
			app.run();
		};
	}
};
