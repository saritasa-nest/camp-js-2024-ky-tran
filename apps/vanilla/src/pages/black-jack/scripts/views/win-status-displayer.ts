import { $$ } from '../utils';
import { WinStatus } from '../types';
import { Subscriber } from '../models';

/** Displays the win status for a specific player. */
export class WinStatusDisplayer implements Subscriber<WinStatus> {
	/**
	 * Updates the player view to indicate if the player has won.
	 * @param playerIndex - The index of the player whose win status is being updated.
	 * @param isWin - A boolean indicating if the player has won.
	 */
	public update({ playerIndex, isWin }: WinStatus): void {
		if (isWin) {
			const player = $$('.user')[playerIndex];

			if (!player.classList.contains('winner')) {
				player.classList.add('winner');
			}
		}
	}
}
