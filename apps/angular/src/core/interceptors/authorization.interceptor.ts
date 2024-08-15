import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { first, map, Observable, switchMap } from 'rxjs';
import { UserStorageService } from '@js-camp/angular/core/services/user-storage.service';

/**
 * Authorization key interceptor.
 * @param req The http request.
 * @param next The next interceptor.
 */
export function authorizationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const AUTH_KEY_HEADER = 'Authorization';

	const userStorageService = inject(UserStorageService);

	// TODO (Ky Tran): By pass urls don't use token to avoid error

	return userStorageService.secret$.pipe(
		first(),
		map(userSecret => userSecret ? req.clone({ setHeaders: { [AUTH_KEY_HEADER]: `Bearer ${userSecret.accessToken}` } }) : req),
		switchMap(reqClone => next(reqClone)),
	);
}
