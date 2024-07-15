import { NUMBER_OF_DICE_RESULTS, NUMBER_OF_PLAYERS } from '../config';
import { AdminPayload, PlayerPayload } from '../types/displayer-types';

import { InTurnDisplayer } from '../views/in-turn-displayers';
import { InitialAdminDisplayer, InitialPlayerDisplayer } from '../views/initial-displayers';
import { ResultsAdminDisplayer, ResultsPlayerDisplayer } from '../views/results-displayers';
import { WinStatusDisplayer } from '../views/win-status-displayer';

import { Admin, Player } from './players';
import { DiceGenerator, TurnGenerator } from './generators';

/** The App class initializes the game, sets up generators, creates admin and players, and starts the game. */
export class App {
	private readonly turnGenerator = new TurnGenerator(NUMBER_OF_PLAYERS);

	private readonly diceGenerator = new DiceGenerator(NUMBER_OF_DICE_RESULTS);

	public constructor() {
		// Connect diceGenerator and turnGenerator to get player turn result
		this.turnGenerator.subscribe(this.diceGenerator);

		// Subscribe to handle active status of the in turn user
		this.turnGenerator.subscribe(new InTurnDisplayer());

		// Create / Subscribe admin and players for accessing player turn result and render view
		this.createAdmin();
		this.createPlayers();
	}

	private createAdmin(): void {
		const initialAdminDisplayer = new InitialAdminDisplayer();
		const resultsAdminDisplayer = new ResultsAdminDisplayer();

		const adminPayload: AdminPayload = {
			displayers: { initialAdminDisplayer, resultsAdminDisplayer },
		};

		this.diceGenerator.subscribe(new Admin(adminPayload));
	}

	private createPlayers(): void {
		const initialPlayerDisplayer = new InitialPlayerDisplayer();
		const resultsPlayerDisplayer = new ResultsPlayerDisplayer();
		const winStatusDisplayer = new WinStatusDisplayer();

		Array.from({ length: NUMBER_OF_PLAYERS }).map((_, playerIndex) => {
			const playerPayload: PlayerPayload = {
				selfIndex: playerIndex,
				displayers: {
					initialPlayerDisplayer,
					resultsPlayerDisplayer,
					winStatusDisplayer,
				},
			};

			this.diceGenerator.subscribe(new Player(playerPayload));
		});
	}

	/** Get the current result for the current player and initiate the next turn in the game. */
	public run(): void {
		this.turnGenerator.run();
	}
}
