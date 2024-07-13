import {
	NUMBER_OF_DICE_RESULTS,
	NUMBER_OF_PLAYERS,
	WINNER_DICE_TOTAL_RESULT,
} from '../config';

import { Admin, DiceGenerator, Player, TurnGenerator } from '../controllers';

/** The App class initializes the game, sets up generators, creates admin and players, and starts the game. */
export class App {
	private readonly turnGenerator: TurnGenerator;

	private readonly diceGenerator: DiceGenerator;

	public constructor() {
		// Connect dice and turn to get player turn result
		this.turnGenerator = new TurnGenerator(NUMBER_OF_PLAYERS);
		this.diceGenerator = new DiceGenerator(NUMBER_OF_DICE_RESULTS);

		this.turnGenerator.subscribe(this.diceGenerator);

		// Create / Subscribe admin and players for accessing player turn result and render view
		this.createAdmin();
		this.createPlayers();
	}

	private createAdmin(): void {
		const admin = new Admin();
		this.diceGenerator.subscribe(admin);
	}

	private createPlayers(): void {
		Array.from({ length: NUMBER_OF_PLAYERS }).map((_, playerIndex) => {
			const player = new Player(playerIndex, WINNER_DICE_TOTAL_RESULT);
			this.diceGenerator.subscribe(player);
		});
	}

	/** Initiates the next turn in the game. */
	public start(): void {
		this.turnGenerator.next();
	}
}
