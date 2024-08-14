import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/** Sign In component. */
@Component({
	selector: 'camp-sign-in',
	standalone: true,
	templateUrl: './sign-in.component.html',
	styleUrl: './sign-in.component.css',
	imports: [RouterModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
	// /** Hide signal. */
	// protected readonly hide = signal(true);

	// /**
	//  * Handle hide password event.
	//  * @param event Mouse event.
	//  */
	// protected onHidePassword(event: MouseEvent): void {
	// 	this.hide.set(!this.hide());
	// 	event.stopPropagation();
	// }
}
