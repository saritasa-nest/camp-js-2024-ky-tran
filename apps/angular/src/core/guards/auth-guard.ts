import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { PATHS } from '@js-camp/core/utils/paths';

type AuthGuardParams = {

	/**
	 * Whether guard is configured for currently authorized user or not.
	 * If 'true', guard will prevent a current user from accessing a route if he is not authorized.
	 * If 'false', guard will prevent a current user from accessing a route if he is authorized.
	 */
	readonly isAuthorized: boolean;
};

/**
 * Auth guard.
 * @param isAuthorized The route required authorization or not.
 * @returns CanMatchFn.
 */
export function authGuard({ isAuthorized }: AuthGuardParams): CanMatchFn {
	return () => {
		const router = inject(Router);

		const userService = inject(UserService);

		return userService.isAuthorized$.pipe(
			map(isUserAuthorized => {
				if (isAuthorized) {
					return isUserAuthorized ? true : new RedirectCommand(router.parseUrl(PATHS.signIn));
				}

				return isUserAuthorized ? new RedirectCommand(router.parseUrl(PATHS.userProfile)) : true;
			}),
		);
	};
}
