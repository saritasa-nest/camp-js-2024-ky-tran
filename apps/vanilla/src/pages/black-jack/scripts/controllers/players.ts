import { sum } from '../utils';
import { NUMBER_OF_PLAYERS, WINNER_DICE_TOTAL_RESULT } from '../config';
import { Publisher, Subscriber } from '../models';

import {
	AdminPayload,
	InitialDisplay,
	InTurn,
	PlayerPayload,
	PlayerResults,
	PlayerTurnResult,
	WinStatus,
} from '../types';

/** Base class for all players to manage their own dice results and notify to displayers to display dice results all the screen. */
class Attender {
	/** Array to store all dice roll results of a player. */
	protected readonly diceResults: number[] = [];

	/** Publisher instance for notifying displayers with player results. */
	protected readonly results = new Publisher<PlayerResults>();
}

/** Admin role tracking all players results and displaying results. */
export class Admin extends Attender implements Subscriber<PlayerTurnResult> {
	private readonly initial = new Publisher<null>();

	public constructor({ displayerInstances }: AdminPayload) {
		super();

		this.initial.subscribe(displayerInstances.initialAdminDisplayer);
		this.results.subscribe(displayerInstances.resultsAdminDisplayer);

		// 'null' -> No need data for initial render
		this.initial.notify(null);
	}

	/**
	 * Updates dice results for a player's turn and notifies subscribers (displayers) with the updated results.
	 * @param playerIndex - Index of the player whose turn result is being updated.
	 * @param diceResult - Result of the dice roll for the player's turn.
  */
	public update({ playerIndex, diceResult }: PlayerTurnResult): void {
		this.diceResults.push(diceResult);
		this.results.notify({ playerIndex, diceResults: this.diceResults });
	}
}

/** Represents a player in the game, tracking their turns and notifying displayer for display result. */
export class Player extends Attender implements Subscriber<PlayerTurnResult> {
	private readonly selfIndex: number;

	private readonly winnerDiceTotalResult: number = WINNER_DICE_TOTAL_RESULT;

	private readonly initial = new Publisher<InitialDisplay>();

	private readonly winStatus = new Publisher<WinStatus>();

	private readonly inTurn = new Publisher<InTurn>();

	public constructor({ selfIndex, winnerDiceTotalResult, displayerInstances }: PlayerPayload) {
		super();

		this.selfIndex = selfIndex;

		if (winnerDiceTotalResult !== undefined) {
			this.winnerDiceTotalResult = winnerDiceTotalResult;
		}

		this.initial.subscribe(displayerInstances.initialPlayerDisplayer);
		this.results.subscribe(displayerInstances.resultsPlayerDisplayer);
		this.winStatus.subscribe(displayerInstances.winStatusDisplayer);
		this.inTurn.subscribe(displayerInstances.inTurnDisplayer);

		this.initial.notify({ playerIndex: this.selfIndex });
	}

	/**
	 * Updates the player's state with the latest turn result.
	 * Notifies subscribers with updated results, win status, and next player's turn.
	 * @param playerIndex - Index of the player whose turn result is being updated.
	 * @param diceResult - Result of the dice roll for the player's turn.
  */
	public update({ playerIndex, diceResult }: PlayerTurnResult): void {
		if (playerIndex === this.selfIndex) {
			this.diceResults.push(diceResult);

			this.results.notify({ playerIndex, diceResults: this.diceResults });

			this.winStatus.notify({
				playerIndex,
				isWin: sum(this.diceResults) >= this.winnerDiceTotalResult,
			});

			this.inTurn.notify({
				inTurnIndex: (playerIndex + 1) % NUMBER_OF_PLAYERS,
			});
		}
	}
}
