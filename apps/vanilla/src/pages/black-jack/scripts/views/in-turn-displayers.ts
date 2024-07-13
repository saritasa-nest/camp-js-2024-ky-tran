import { $$ } from '../utils';
import { InTurn } from '../types';
import { Subscriber } from '../models';

/** Displays the current player's turn by highlighting the active player. */
export class InTurnDisplayer implements Subscriber<InTurn> {

	/**
	 * Updates the display to highlight the current player's turn.
	 * @param inTurnIndex - The index of the player whose turn it is.
	 */
	public update({ inTurnIndex }: InTurn): void {
		const players = $$('.user');
		const player = players[inTurnIndex];

		players.forEach(playerItem => playerItem.classList.remove('active'));
		player.classList.add('active');
	}
}
