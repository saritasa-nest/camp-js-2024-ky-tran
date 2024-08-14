import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProgressSpinnerComponent } from '@js-camp/angular/shared/components/progress-spinner/progress-spinner.component';
import { ErrorMessageComponent } from '@js-camp/angular/shared/components/error-message/error-message.component';

/** Main Layout component. */
@Component({
	selector: 'camp-main-layout',
	standalone: true,
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.css',
	imports: [RouterModule, ProgressSpinnerComponent, ErrorMessageComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}

// this.signInForm.controls['password'].valueChanges.subscribe(value => {
// 	this.showPasswordIcon = !!value; // Show icon if there's a value, hide if empty
// });
