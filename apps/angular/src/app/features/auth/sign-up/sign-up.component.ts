import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignUpFormService } from '@js-camp/angular/core/services/sign-up-form.service';

/** Sign Up component. */
@Component({
	selector: 'camp-sign-up',
	standalone: true,
	templateUrl: './sign-up.component.html',
	styleUrls: ['../auth.component.css', './sign-up.component.css'],
	imports: [RouterModule, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
	private readonly formService = inject(SignUpFormService);

	/** Sign up form group. */
	protected readonly form = this.formService.initialize();

	/** On submit. */
	protected onSubmit(): void {
		console.log('Submit', this.form.valid);
		console.log(this.form);
	}
}
