import { Admin, DiceGenerator, Player, TurnGenerator } from '../controllers';
import { AdminPayload, PlayerPayload } from '../types';
import { NUMBER_OF_DICE_RESULTS, NUMBER_OF_PLAYERS } from '../config';

import {
	InitialAdminDisplayer,
	InitialPlayerDisplayer,
	InTurnDisplayer,
	ResultsAdminDisplayer,
	ResultsPlayerDisplayer,
	WinStatusDisplayer,
} from '../views';

/** The App class initializes the game, sets up generators, creates admin and players, and starts the game. */
export class App {
	// Generator instances

	private readonly turnGenerator = new TurnGenerator(NUMBER_OF_PLAYERS);

	private readonly diceGenerator = new DiceGenerator(NUMBER_OF_DICE_RESULTS);

	// Admin displayer instances

	private readonly initialAdminDisplayer = new InitialAdminDisplayer();

	private readonly resultsAdminDisplayer = new ResultsAdminDisplayer();

	// Player displayer instances

	private readonly initialPlayerDisplayer = new InitialPlayerDisplayer();

	private readonly resultsPlayerDisplayer = new ResultsPlayerDisplayer();

	private readonly winStatusDisplayer = new WinStatusDisplayer();

	private readonly inTurnDisplayer = new InTurnDisplayer();

	public constructor() {
		// Connect diceGenerator and turnGenerator to get player turn result
		this.turnGenerator.subscribe(this.diceGenerator);

		// Create / Subscribe admin and players for accessing player turn result and render view
		this.createAdmin();
		this.createPlayers();
	}

	private createAdmin(): void {
		const adminPayload: AdminPayload = {
			displayerInstances: {
				initialAdminDisplayer: this.initialAdminDisplayer,
				resultsAdminDisplayer: this.resultsAdminDisplayer,
			},
		};

		const admin = new Admin(adminPayload);
		this.diceGenerator.subscribe(admin);
	}

	private createPlayers(): void {
		Array.from({ length: NUMBER_OF_PLAYERS }).map((_, playerIndex) => {
			const playerPayload: PlayerPayload = {
				selfIndex: playerIndex,
				displayerInstances: {
					initialPlayerDisplayer: this.initialPlayerDisplayer,
					resultsPlayerDisplayer: this.resultsPlayerDisplayer,
					winStatusDisplayer: this.winStatusDisplayer,
					inTurnDisplayer: this.inTurnDisplayer,
				},
			};

			const player = new Player(playerPayload);
			this.diceGenerator.subscribe(player);
		});
	}

	/** Get the current result for the current player and initiate the next turn in the game. */
	public run(): void {
		this.turnGenerator.next();
	}
}
