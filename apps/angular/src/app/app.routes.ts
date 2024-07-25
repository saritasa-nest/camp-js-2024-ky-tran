import { Routes } from '@angular/router';
import { HomeComponent } from '@js-camp/angular/app/features/pages/home/home.component';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: '**',
		loadComponent: () => import('@js-camp/angular/app/features/pages/not-found/not-found.component').then(
			module => module.NotFoundComponent,
		),
	},
];
