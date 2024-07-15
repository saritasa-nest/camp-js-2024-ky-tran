import { InitialAdminDisplayer, InitialPlayerDisplayer } from '../views/initial-displayers';
import { ResultsAdminDisplayer, ResultsPlayerDisplayer } from '../views/results-displayers';
import { WinStatusDisplayer } from '../views/win-status-displayer';

/** Represents instances of admin displayers. */
export type AdminDisplayers = {

	/** The instance of InitialAdminDisplayer. */
	readonly initialAdminDisplayer: InitialAdminDisplayer;

	/** The instance of ResultsAdminDisplayer. */
	readonly resultsAdminDisplayer: ResultsAdminDisplayer;
};

/** Represents the payload containing admin displayer instances. */
export type AdminPayload = {

	/** The instances of admin displayers. */
	readonly displayers: AdminDisplayers;
};

/** Represents instances of player displayers. */
export type PlayerDisplayers = {

	/** The instance of InitialPlayerDisplayer. */
	readonly initialPlayerDisplayer: InitialPlayerDisplayer;

	/** The instance of ResultsPlayerDisplayer. */
	readonly resultsPlayerDisplayer: ResultsPlayerDisplayer;

	/** The instance of WinStatusDisplayer. */
	readonly winStatusDisplayer: WinStatusDisplayer;
};

/** Represents the payload containing player data and displayers. */
export type PlayerPayload = {

	/** The index of the player itself. */
	readonly selfIndex: number;

	/** The total result of the winner's dice. */
	readonly winnerDiceTotalResult?: number;

	/** The instances of player displayers. */
	readonly displayers: PlayerDisplayers;
};
