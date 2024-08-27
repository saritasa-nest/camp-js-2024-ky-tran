import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '@js-camp/angular/config/app.config';
import { inject } from '@angular/core';

/**
 * Api key interceptor.
 * @param req The http request.
 * @param next The next interceptor.
 */
export function apiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const API_KEY_HEADER = 'Api-Key';
	const appConfig = inject(AppConfig);

	return next(req.clone({ setHeaders: { [API_KEY_HEADER]: appConfig.apiKey } }));
}
