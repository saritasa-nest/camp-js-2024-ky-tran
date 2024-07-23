import { InitialAdminDisplayer } from '../views/initial-admin-displayer';
import { InitialPlayerDisplayer } from '../views/initial-player-displayer';
import { ResultsAdminDisplayer } from '../views/results-admin-displayer';
import { ResultsPlayerDisplayer } from '../views/results-player-displayer';
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

	/** The instance of {@link InitialPlayerDisplayer}. */
	readonly initialPlayerDisplayer: InitialPlayerDisplayer;

	/** The instance of {@link ResultsPlayerDisplayer}. */
	readonly resultsPlayerDisplayer: ResultsPlayerDisplayer;

	/** The instance of {@link WinStatusDisplayer}. */
	readonly winStatusDisplayer: WinStatusDisplayer;
};

/** Represents the payload containing player data and displayers. */
export type PlayerPayload = {

	/** The index of the player itself. */
	readonly selfIndex: number;

	/** The total result of the winner's dice. */
	readonly winnerDiceTotalResult: number | null;

	/** The instances of player displayers. */
	readonly displayers: PlayerDisplayers;
};
