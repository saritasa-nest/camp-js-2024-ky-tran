import { Routes } from '@angular/router';
import { HomeComponent } from '@js-camp/angular/app/features/home/home.component';
import { AuthComponent } from '@js-camp/angular/app/features/auth/auth.component';
import { NotFoundComponent } from '@js-camp/angular/app/features/not-found/not-found.component';
import { SignInComponent } from '@js-camp/angular/app/features/auth/sign-in/sign-in.component';

import { authGuard } from '../core/guards/auth-guard';

/** Routes object. */
export const appRoutes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent, canMatch: [authGuard()] },
	{
		path: 'auth',
		component: AuthComponent,
		children: [
			{ path: '', redirectTo: 'signin', pathMatch: 'full' },
			{ path: 'signin', component: SignInComponent },
		],
	},
	{ path: '**', component: NotFoundComponent },
];
