import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/** Sign Up component. */
@Component({
	selector: 'camp-sign-up',
	standalone: true,
	templateUrl: './sign-up.component.html',
	styleUrl: './sign-up.component.css',
	imports: [RouterModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {}
