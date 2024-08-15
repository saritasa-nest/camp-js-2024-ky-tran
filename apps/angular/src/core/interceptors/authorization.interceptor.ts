import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { first, map, Observable, switchMap } from 'rxjs';
import { UserStorageService } from '@js-camp/angular/core/services/user-storage.service';
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

	const bypassUrls = [urlConfig.animeUrl];

	if (bypassUrls.includes(req.url)) {
		return next(req);
	}

	return userStorageService.secret$.pipe(
		first(),
		map(userSecret => userSecret ? req.clone({ setHeaders: { [AUTH_KEY_HEADER]: `Bearer ${userSecret.accessToken}` } }) : req),
		switchMap(reqClone => next(reqClone)),
	);
}
