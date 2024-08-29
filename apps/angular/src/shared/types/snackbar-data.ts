import { ERROR_STATUS, SUCCESS_STATUS } from '../constants';

/** Snackbar data status. */
export enum SnackbarDataStatus {
	Success = SUCCESS_STATUS,
	Error = ERROR_STATUS,
}

/** Snackbar data. */
export type SnackbarData = Readonly<{

	/** Status. */
	status: SnackbarDataStatus;

	/** Message. */
	message: string;
}>;
