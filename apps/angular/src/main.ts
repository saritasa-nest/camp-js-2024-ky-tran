import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { environment } from './environments/environment';
import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';
import { authorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { authorizationRefreshInterceptor } from './core/interceptors/authorization-refresh.interceptor';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(appRoutes),
		provideAnimationsAsync(),
		provideHttpClient(
			withInterceptors([apiKeyInterceptor, authorizationInterceptor, authorizationRefreshInterceptor]),
			withFetch(),
		),
	],
}).catch(error => console.error(error));
