import { Subscriber } from '../models/subscriber';
import { PlayerResults } from '../types/player-types';
import { selectAllElements } from '../utils/elements';

import { ResultsDisplayer } from './results-displayers';

/** Displays the aggregated dice results the total result for a specific player view. */
export class ResultsPlayerDisplayer extends ResultsDisplayer implements Subscriber<PlayerResults> {
	/**
	 * Updates the player view with the latest dice results and the total result.
	 * @param playerIndex The index of the player whose results are being updated.
	 * @param diceResults Array of dice results to be displayed.
	 */
	public update({ playerIndex, diceResults }: PlayerResults): void {
		const playerEl = selectAllElements('.user')[playerIndex];

		this.render({
			diceResults,
			targetEl: playerEl,
			resultsClass: 'user__results',
			infoResultClass: 'user__info-result',
		});
	}
}
