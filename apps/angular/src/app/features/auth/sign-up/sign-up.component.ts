import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
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
	/** Field email instance. */
	@ViewChild('email')
	private readonly fieldEmailComponent!: FieldEmailComponent;

	/** Field password instance. */
	@ViewChild('password')
	private readonly fieldPasswordComponent!: FieldPasswordComponent;

	/** Field password confirm instance. */
	@ViewChild('passwordConfirm')
	private readonly fieldPasswordConfirmComponent!: FieldPasswordComponent;

	/** Field first name instance. */
	@ViewChild('firstName')
	private readonly fieldFirstNameComponent!: FieldNameComponent;

	/** Field last name instance. */
	@ViewChild('lastName')
	private readonly fieldLastNameComponent!: FieldNameComponent;

	/** Sign up form group. */
	protected readonly form = inject(SignUpFormService).initialize();

	/** Loading status. */
	protected readonly isLoading = signal(false);

	/** On submit. */
	protected onSubmit(): void {
		this.form.markAllAsTouched();

		if (!this.form.valid) {
			[
				this.fieldEmailComponent,
				this.fieldPasswordComponent,
				this.fieldPasswordConfirmComponent,
				this.fieldFirstNameComponent,
				this.fieldLastNameComponent,
			].forEach(c => c.detectChanges());

			console.log(this.form);
			return;
		}

		console.log('Submit');
	}
}
