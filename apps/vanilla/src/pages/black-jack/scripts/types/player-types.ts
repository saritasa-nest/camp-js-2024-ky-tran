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
