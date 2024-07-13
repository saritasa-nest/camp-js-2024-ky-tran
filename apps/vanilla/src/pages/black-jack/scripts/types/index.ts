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

/** Represents the all dice results of a player player's turn. */
export type PlayerResults = InitialDisplay & {

	/** Array of dice results for the player. */
	readonly diceResults: number[];
};

/** Represents the data required for rendering results on the UI. */
export type ResultsRender = {

	/** Array of dice results to render. */
	diceResults: number[];

	/** Target element in the DOM for rendering. */
	targetEl: HTMLElement;

	/** Class of the element for DOM manipulating. */
	resultsClass: string;

	/** Class of the element for DOM manipulating. */
	infoResultClass: string;
};

/** Represents the win status of a player with the player index and a boolean indicating if they won. */
export type WinStatus = InitialDisplay & {

	/** Boolean indicating if the player has won. */
	isWin: boolean;
};

/** Represents the index of the player in turn to roll. */
export type InTurn = {

	/** Index of the player in turn to roll. */
	inTurnIndex: number;
};
