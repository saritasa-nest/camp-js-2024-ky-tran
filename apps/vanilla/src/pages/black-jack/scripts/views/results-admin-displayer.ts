import { selectElement } from '../utils/elements';
import { PlayerResults } from '../types/player-types';
import { Subscriber } from '../models/subscriber';

import { ResultsDisplayer } from './results-displayers';

/** Displays the aggregated dice results and the total dice result for the admin view. */
export class ResultsAdminDisplayer extends ResultsDisplayer implements Subscriber<PlayerResults> {
	/**
	 * Updates the admin view with the latest dice results and total result.
	 * @param diceResults - Array of dice results to be displayed.
	 */
	public update({ diceResults }: PlayerResults): void {
		const adminEl = selectElement('.admin');

		this.render({
			diceResults,
			targetEl: adminEl,
			resultsClass: 'main__all-rolls',
			infoResultClass: 'user__info-result',
		});
	}
}
