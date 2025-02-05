import { defer, EMPTY, finalize, ignoreElements, merge, MonoTypeOperatorFunction, shareReplay, Subject } from 'rxjs';

/**
 * Toggles loading subject when observable execution starts and ends.
 * @param subject$ Execution state subject. Will accept `true` when execution started and `false` when it's finalized.
 */
export function toggleExecutionState<T>(subject$: Subject<boolean>): MonoTypeOperatorFunction<T> {
	const startLoadingSideEffect$ = defer(() => {
		subject$.next(true);
		return EMPTY;
	});

	return source$ => {
		const sharedSource$ = source$.pipe(shareReplay({ refCount: true, bufferSize: 1 }));

		const finishLoadingSideEffect$ = sharedSource$.pipe(
			ignoreElements(),
			finalize(() => subject$.next(false)),
		);

		return merge(startLoadingSideEffect$, finishLoadingSideEffect$, source$);
	};
}
