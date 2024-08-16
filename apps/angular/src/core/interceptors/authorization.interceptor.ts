import { inject } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { first, map, Observable, switchMap } from 'rxjs';
import { UserStorageService } from '@js-camp/angular/core/services/user-storage.service';
import { UrlConfig } from '@js-camp/angular/config/url.config';

/** Auth key header. */
export const AUTH_KEY_HEADER = 'Authorization';

/**
 * Authorization bypass urls.
 * @param url Url.
 */
export function authorizationBypassUrls(url: string): boolean {
	const urlConfig = inject(UrlConfig);
	const bypassUrls = [urlConfig.animeUrl];

	return (bypassUrls.includes(url));
}

/**
 * Create bearer token option.
 * @param token Token.
 */
export function createBearerTokenOption(token: string): { setHeaders: { [key: string]: string; }; } {
	return { setHeaders: { [AUTH_KEY_HEADER]: `Bearer ${token}` } };
}

/**
 * Authorization key interceptor.
 * @param req The http request.
 * @param next The next interceptor.
 */
export function authorizationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const userStorageService = inject(UserStorageService);

	if (authorizationBypassUrls(req.url)) {
		return next(req);
	}

	return userStorageService.secret$.pipe(
		first(),
		map(userSecret => userSecret ? req.clone(createBearerTokenOption(userSecret.accessToken)) : req),
		switchMap(reqClone => next(reqClone)),
	);
}
