import { Routes } from '@angular/router';
import { HomeComponent } from '@js-camp/angular/app/features/home/home.component';
import { AuthComponent } from '@js-camp/angular/app/features/auth/auth.component';
import { NotFoundComponent } from '@js-camp/angular/app/features/not-found/not-found.component';
import { SignInComponent } from '@js-camp/angular/app/features/auth/sign-in/sign-in.component';
import { authGuard } from '@js-camp/angular/core/guards/auth-guard';
import { UserComponent } from '@js-camp/angular/app/features/user/user.component';
import { UserProfileComponent } from '@js-camp/angular/app/features/user/user-profile/user-profile.component';
import { SignUpComponent } from '@js-camp/angular/app/features/auth/sign-up/sign-up.component';

/** Routes object. */
export const appRoutes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{
		path: 'user',
		component: UserComponent,
		children: [
			{ path: '', redirectTo: 'profile', pathMatch: 'full' },
			{ path: 'profile', component: UserProfileComponent, canMatch: [authGuard({ isAuthorized: true })] },
		],
	},
	{
		path: 'auth',
		component: AuthComponent,
		children: [
			{ path: '', redirectTo: 'signin', pathMatch: 'full' },
			{ path: 'signin', component: SignInComponent, canMatch: [authGuard({ isAuthorized: false })] },
			{ path: 'signup', component: SignUpComponent, canMatch: [authGuard({ isAuthorized: false })] },
		],
	},
	{ path: '**', component: NotFoundComponent },
];
