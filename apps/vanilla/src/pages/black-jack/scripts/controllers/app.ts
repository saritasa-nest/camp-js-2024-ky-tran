import { NUMBER_OF_DICE_RESULTS, NUMBER_OF_PLAYERS } from '../config';
import { AdminPayload, PlayerPayload } from '../types/displayer-types';
import { InTurnDisplayer } from '../views/in-turn-displayers';
import { InitialAdminDisplayer } from '../views/initial-admin-displayer';
import { InitialPlayerDisplayer } from '../views/initial-player-displayer';
import { WinStatusDisplayer } from '../views/win-status-displayer';
import { ResultsAdminDisplayer } from '../views/results-admin-displayer';
import { ResultsPlayerDisplayer } from '../views/results-player-displayer';

import { Admin, Player } from './players';
import { DiceGenerator, TurnGenerator } from './generators';

/** Initialize the game. */
export class App {
	private readonly turnGenerator = new TurnGenerator(NUMBER_OF_PLAYERS);

	private readonly diceGenerator = new DiceGenerator(NUMBER_OF_DICE_RESULTS);

	public constructor() {
		this.turnGenerator.subscribe(this.diceGenerator);
		this.turnGenerator.subscribe(new InTurnDisplayer());

		this.subscribeAdmin(this.createAdmin());
		this.subscribePlayers(this.createPlayers());
	}

	private createAdmin(): Admin {
		const initialAdminDisplayer = new InitialAdminDisplayer();
		const resultsAdminDisplayer = new ResultsAdminDisplayer();

		const adminPayload: AdminPayload = {
			displayers: { initialAdminDisplayer, resultsAdminDisplayer },
		};

		return new Admin(adminPayload);
	}

	private subscribeAdmin(admin: Admin): void {
		this.diceGenerator.subscribe(admin);
	}

	private createPlayers(): Player[] {
		const initialPlayerDisplayer = new InitialPlayerDisplayer();
		const resultsPlayerDisplayer = new ResultsPlayerDisplayer();
		const winStatusDisplayer = new WinStatusDisplayer();

		return Array.from({ length: NUMBER_OF_PLAYERS }).map((_, playerIndex) => {
			const playerPayload: PlayerPayload = {
				selfIndex: playerIndex,
				displayers: { initialPlayerDisplayer, resultsPlayerDisplayer, winStatusDisplayer },
			};

			return new Player(playerPayload);
		});
	}

	private subscribePlayers(players: Player[]): void {
		players.forEach(player => this.diceGenerator.subscribe(player));
	}

	/** Start the game. */
	public run(): void {
		this.turnGenerator.run();
	}
}
