import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignUpFormService } from '@js-camp/angular/core/services/sign-up-form.service';
import { FieldEmailComponent } from '@js-camp/angular/app/features/auth/field-email/field-email.component';
import { FieldPasswordComponent } from '@js-camp/angular/app/features/auth/field-password/field-password.component';
import { FieldNameComponent } from '@js-camp/angular/app/features/auth/field-name/field-name.component';

/** Sign Up component. */
@Component({
	selector: 'camp-sign-up',
	standalone: true,
	templateUrl: './sign-up.component.html',
	styleUrls: ['../auth.component.css', './sign-up.component.css'],
	imports: [RouterModule, ReactiveFormsModule, FieldEmailComponent, FieldPasswordComponent, FieldNameComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
	/** Sign up form group. */
	protected readonly form = inject(SignUpFormService).initialize();

	/** Loading status. */
	protected readonly isLoading = signal(false);

	/** On submit. */
	protected onSubmit(): void {
		this.form.markAllAsTouched();

		if (!this.form.valid) {
			console.log(this.form);
			return;
		}

		console.log('Submit');
	}
}
