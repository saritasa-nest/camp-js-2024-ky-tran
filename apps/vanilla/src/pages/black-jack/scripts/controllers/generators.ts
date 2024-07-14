import { START_PLAYER_INDEX } from '../config';
import { Publisher } from '../models';
import { PlayerTurnResult } from '../types';
import { getRandomInt } from '../utils';

/** Manages the turn order of players in a game, notifying 'diceGenerator' of each player's turn. */
export class TurnGenerator extends Publisher<number> {
	public constructor(private readonly playersCount: number, public currentPlayerIndex = START_PLAYER_INDEX) {
		super();
	}

	/** Notifies the current player index then updates the current player index to the next one. */
	public next(): void {
		this.notify(this.currentPlayerIndex);
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersCount;
	}
}

/** Simulates dice rolls and notifies subscribers of player turn results. */
export class DiceGenerator extends Publisher<PlayerTurnResult> {
	public constructor(private readonly sidesCount: number) {
		super();
	}

	/**
	 * Simulates rolling a dice and returns the result.
	 * @returns A random integer representing the result of the dice roll.
  */
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
