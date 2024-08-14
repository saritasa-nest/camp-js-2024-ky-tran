import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

/** Sign In component. */
@Component({
	selector: 'camp-sign-in',
	standalone: true,
	templateUrl: './sign-in.component.html',
	styleUrl: './sign-in.component.css',
	imports: [RouterModule, MatIconModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
	/** Hide password signal. */
	protected readonly hidePassword = signal(true);

	/**
	 * Toggle hide password event.
	 * @param event Mouse event.
	 */
	protected onToggleHidePassword(): void {
		this.hidePassword.set(!this.hidePassword());
	}
}
