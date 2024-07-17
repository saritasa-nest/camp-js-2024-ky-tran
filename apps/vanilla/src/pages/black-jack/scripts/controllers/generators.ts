import { START_PLAYER_INDEX } from '../config';
import { Publisher } from '../models/publisher';
import { PlayerTurnResult } from '../types/player-types';
import { getRandomInt } from '../utils/mathematics';

/** Manages the turn order of players in a game, notifying 'diceGenerator' of each player's turn. */
export class TurnGenerator extends Publisher<number> {
	public constructor(private readonly playersCount: number, public currentPlayerIndex = START_PLAYER_INDEX) {
		super();
	}

	private next(): void {
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersCount;
	}

	/** Notifies the current player index then updates the current player index to the next one. */
	public run(): void {
		this.notify(this.currentPlayerIndex);
		this.next();
	}
}

/** Simulates dice rolls and notifies subscribers of player turn results. */
export class DiceGenerator extends Publisher<PlayerTurnResult> {
	public constructor(private readonly sidesCount: number) {
		super();
	}

	/** Simulates rolling a dice and returns the result. */
	public roll(): number {
		return getRandomInt(1, this.sidesCount);
	}

	/**
	 * Receive turn index from Turn Generator.
	 * @param playerIndex - Index of the player whose turn result is being updated.
	 */
	public update(playerIndex: number): void {
		this.notify({ playerIndex, diceResult: this.roll() });
	}
}
