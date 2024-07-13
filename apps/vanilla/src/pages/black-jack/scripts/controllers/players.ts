import { sum } from '../utils';
import { NUMBER_OF_PLAYERS } from '../config';
import { Publisher, Subscriber } from '../models';
import { InitialAdminDisplayer, InitialPlayerDisplayer } from '../views';
import { WinStatusDisplayer } from '../views/win-status-displayer';
import { InTurnDisplayer } from '../views/in-turn-displayers';

import {
	InitialDisplay,
	InTurn,
	PlayerResults,
	PlayerTurnResult,
	WinStatus,
} from '../types';

import {
	ResultsAdminDisplayer,
	ResultsPlayerDisplayer,
} from '../views/results-displayers';

/** Base class for managing dice results and notifying subscribers of player results. */
class Attender {
	/** Array to store dice roll results. */
	protected readonly diceResults: number[] = [];

	/** Publisher instance for notifying subscribers (displayers) with player results. */
	protected readonly results = new Publisher<PlayerResults>();
}

/** Admin role tracking all players results and displaying results. */
export class Admin extends Attender implements Subscriber<PlayerTurnResult> {
	private readonly initial = new Publisher<null>();

	public constructor() {
		super();

		this.initial.subscribe(new InitialAdminDisplayer());
		this.results.subscribe(new ResultsAdminDisplayer());

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

/** * Represents a player in the game, tracking their turns and notifying displayer for display result. */
export class Player extends Attender implements Subscriber<PlayerTurnResult> {
	private readonly initial = new Publisher<InitialDisplay>();

	private readonly winStatus = new Publisher<WinStatus>();

	private readonly inTurn = new Publisher<InTurn>();

	public constructor(
		private readonly selfIndex: number,
		private readonly winnerDiceTotalResult: number,
	) {
		super();

		this.initial.subscribe(new InitialPlayerDisplayer());
		this.results.subscribe(new ResultsPlayerDisplayer());
		this.winStatus.subscribe(new WinStatusDisplayer());
		this.inTurn.subscribe(new InTurnDisplayer());

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
