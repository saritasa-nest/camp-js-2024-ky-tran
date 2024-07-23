import { selectElementInParent } from '../utils/elements';
import { sum } from '../utils/mathematics';
import { ResultsRender } from '../types/player-types';

/** Base class for displaying the results of dice rolls. */
export class ResultsDisplayer {
	/**
	 * Renders the dice results and their sum into the specified elements.
	 * @param renderOptions - The parameters for rendering the results.
	 * @param renderOptions.diceResults - Array of dice results to be displayed.
	 * @param renderOptions.targetEl - The target HTMLElement where results will be rendered.
	 * @param renderOptions.resultsClass - The CSS class used to select the element displaying the dice results.
	 * @param renderOptions.infoResultClass - The CSS class used to select the element displaying the sum of dice results.
	 */
	protected render({
		diceResults,
		targetEl,
		resultsClass,
		infoResultClass,
	}: ResultsRender): void {
		const resultsEl = selectElementInParent(targetEl, `.${resultsClass}`);
		const infoResultEl = selectElementInParent(targetEl, `.${infoResultClass}`);

		resultsEl.innerHTML = diceResults.join(', ');
		infoResultEl.innerHTML = sum(diceResults).toString();
	}
}
