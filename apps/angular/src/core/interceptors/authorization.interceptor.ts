import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, first, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { UserStorageService } from '@js-camp/angular/core/services/user-storage.service';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { UrlConfig } from '@js-camp/angular/config/url.config';

/**
 * Authorization key interceptor.
 * @param req The http request.
 * @param next The next interceptor.
 */
export function authorizationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const AUTH_KEY_HEADER = 'Authorization';

	const urlConfig = inject(UrlConfig);

	const userStorageService = inject(UserStorageService);

	const userService = inject(UserService);

	const bypassUrls = [urlConfig.animeUrl];

	if (bypassUrls.includes(req.url)) {
		return next(req);
	}

	function createBearerTokenOption(token: string) {
		return { setHeaders: { [AUTH_KEY_HEADER]: `Bearer ${token}` } }
	}

	return userStorageService.secret$.pipe(
		first(),
		map(userSecret => userSecret ? req.clone(createBearerTokenOption(userSecret.accessToken)) : req),
		switchMap(reqClone => next(reqClone).pipe(
			catchError(error => {
				if (error instanceof HttpErrorResponse && error.status !== HttpStatusCode.Unauthorized) {
					return throwError(() => error);
				}

				// Send refresh token
				console.log('Need refresh');

				return userService.signInRefresh().pipe(
					first(),
					switchMap(newUserSecret => next(req.clone(createBearerTokenOption(newUserSecret.accessToken)))),
				);
			}),
		)),
	);
}
