import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '@js-camp/angular/config/app.config';

/**
 * Api key interceptor.
 * @param req The http request.
 * @param next The next interceptor.
 */
export function apiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	return next(req.clone({ setHeaders: { 'Api-Key': (new AppConfig()).apiKey } }));
}
