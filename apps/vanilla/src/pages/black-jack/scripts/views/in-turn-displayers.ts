import { selectAllElements } from '../utils/elements';
import { NUMBER_OF_PLAYERS } from '../config';
import { Subscriber } from '../models/subscriber';

/** Displays the current player's turn by highlighting the active player. */
export class InTurnDisplayer implements Subscriber<number> {
	/**
	 * Updates the display to highlight the current player's turn.
	 * @param playerIndex The index of the current player has just finished rolling.
	 */
	public update(playerIndex: number): void {
		const inTurnIndex = (playerIndex + 1) % NUMBER_OF_PLAYERS;

		const players = selectAllElements('.user');
		const player = players[inTurnIndex];

		players.forEach(playerItem => playerItem.classList.remove('active'));
		player.classList.add('active');
	}
}
