import { $, $$, $_, sum } from '../utils';
import { PlayerResults, ResultsRender } from '../types';
import { Subscriber } from '../models';

/** Base class for displaying the results of dice rolls. */
class ResultsDisplayer {
	/**
	 * Renders the dice results and their sum into the specified elements.
	 * @param diceResults - Array of dice results to be displayed.
	 * @param targetEl - The target HTMLElement where results will be rendered.
	 * @param resultsClass - The CSS class used to select the element displaying the dice results.
	 * @param infoResultClass - The CSS class used to select the element displaying the sum of dice results.
	 */
	protected render({
		diceResults,
		targetEl,
		resultsClass,
		infoResultClass,
	}: ResultsRender): void {
		const resultsEl = $_(targetEl)(`.${resultsClass}`);
		const infoResultEl = $_(targetEl)(`.${infoResultClass}`);

		resultsEl.innerHTML = diceResults.join(', ');
		infoResultEl.innerHTML = sum(diceResults).toString();
	}
}

/** Displays the aggregated dice results and the total dice result for the admin view. */
export class ResultsAdminDisplayer extends ResultsDisplayer implements Subscriber<PlayerResults> {
	/**
	 * Updates the admin view with the latest dice results and total result.
	 * @param diceResults - Array of dice results to be displayed.
	 */
	public update({ diceResults }: PlayerResults): void {
		const admin = $('.debug-user');

		this.render({
			diceResults,
			targetEl: admin,
			resultsClass: 'main__all-rolls',
			infoResultClass: 'user__info-result',
		});
	}
}

/** Displays the aggregated dice results the total result for a specific player view. */
export class ResultsPlayerDisplayer extends ResultsDisplayer implements Subscriber<PlayerResults> {
	/**
	 * Updates the player view with the latest dice results and the total result.
	 * @param playerIndex - The index of the player whose results are being updated.
	 * @param diceResults - Array of dice results to be displayed.
	 */
	public update({ playerIndex, diceResults }: PlayerResults): void {
		const player = $$('.user')[playerIndex];

		this.render({
			diceResults,
			targetEl: player,
			resultsClass: 'user__results',
			infoResultClass: 'user__info-result',
		});
	}
}
