import { Routes } from '@angular/router';
import { HomeComponent } from '@js-camp/angular/app/features/home/home.component';
import { NotFoundComponent } from '@js-camp/angular/app/features/not-found/not-found.component';

/** Routes object. */
export const appRoutes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: '**', component: NotFoundComponent },
];
