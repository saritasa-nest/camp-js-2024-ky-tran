import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/** Main Layout component. */
@Component({
	selector: 'camp-main-layout',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {}
