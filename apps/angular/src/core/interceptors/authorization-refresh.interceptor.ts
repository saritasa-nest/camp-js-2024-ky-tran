import { inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { catchError, first, Observable, switchMap } from 'rxjs';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { UrlConfig } from '@js-camp/angular/config/url.config';
import { authorizationBypassUrls, createBearerTokenOption } from '@js-camp/angular/core/interceptors/authorization.interceptor';

/**
 * Authorization refresh key interceptor.
 * @param req The http request.
 * @param next The next interceptor.
 */
export function authorizationRefreshInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const urlConfig = inject(UrlConfig);

	const userService = inject(UserService);

	if (authorizationBypassUrls(req.url)) {
		return next(req);
	}

	return next(req).pipe(catchError(error => {
		if (
			error instanceof HttpErrorResponse &&
			error.status === HttpStatusCode.Unauthorized &&
			req.url === urlConfig.authSignInRefreshUrl
		) {
			return userService.signOut().pipe(switchMap(() => next(req)));
		}

		return userService.signInRefresh().pipe(
			first(),
			switchMap(newUserSecret => {
				if (newUserSecret) {
					return next(req.clone(createBearerTokenOption(newUserSecret.accessToken)));
				}

				return next(req);
			}),
		);
	}));
}
