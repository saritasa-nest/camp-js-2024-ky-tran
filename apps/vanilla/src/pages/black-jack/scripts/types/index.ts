import { InitialAdminDisplayer, InitialPlayerDisplayer, InTurnDisplayer, ResultsAdminDisplayer, ResultsPlayerDisplayer, WinStatusDisplayer } from '../views';

/** Represents the initial display data with the player index. */
export type InitialDisplay = {

	/** Index of the player for initial display. */
	readonly playerIndex: number;
};

/** Represents the result of a player's turn including the dice result. */
export type PlayerTurnResult = InitialDisplay & {

	/** Result of the dice roll for the player's turn. */
	readonly diceResult: number;
};

/** Represents the all dice results of a specific player. */
export type PlayerResults = InitialDisplay & {

	/** Array of dice results for the player. */
	readonly diceResults: number[];
};

/** Represents the data required for rendering results on the UI. */
export type ResultsRender = {

	/** Array of dice results to render. */
	readonly diceResults: number[];

	/** Target element in the DOM for rendering. */
	readonly targetEl: HTMLElement;

	/** Class of the element for DOM manipulating. */
	readonly resultsClass: string;

	/** Class of the element for DOM manipulating. */
	readonly infoResultClass: string;
};

/** Represents the win status of a specific player by a boolean indicating if they won. */
export type WinStatus = InitialDisplay & {

	/** Boolean indicating if the player has won. */
	readonly isWin: boolean;
};

/** Represents the index of the player in turn to roll. */
export type InTurn = {

	/** Index of the player in turn to roll. */
	readonly inTurnIndex: number;
};

/** Represents instances of admin displayers. */
export type AdminDisplayerInstances = {

	/** The instance of InitialAdminDisplayer. */
	readonly initialAdminDisplayer: InitialAdminDisplayer;

	/** The instance of ResultsAdminDisplayer. */
	readonly resultsAdminDisplayer: ResultsAdminDisplayer;
};

/** Represents the payload containing admin displayer instances. */
export type AdminPayload = {

	/** The instances of admin displayers. */
	readonly displayerInstances: AdminDisplayerInstances;
};

/** Represents instances of player displayers. */
export type PlayerDisplayerInstances = {

	/** The instance of InitialPlayerDisplayer. */
	readonly initialPlayerDisplayer: InitialPlayerDisplayer;

	/** The instance of ResultsPlayerDisplayer. */
	readonly resultsPlayerDisplayer: ResultsPlayerDisplayer;

	/** The instance of WinStatusDisplayer. */
	readonly winStatusDisplayer: WinStatusDisplayer;

	/** The instance of InTurnDisplayer. */
	readonly inTurnDisplayer: InTurnDisplayer;
};

/** Represents the payload containing player data and displayers. */
export type PlayerPayload = {

	/** The index of the player itself. */
	readonly selfIndex: number;

	/** The total result of the winner's dice. */
	readonly winnerDiceTotalResult?: number;

	/** The instances of player displayers. */
	readonly displayerInstances: PlayerDisplayerInstances;
};
