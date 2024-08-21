import { ChangeDetectionStrategy, Component, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError, first, throwError } from 'rxjs';
import { AuthFormErrorService } from '@js-camp/angular/core/services/auth-form-error.service';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { PATHS } from '@js-camp/core/utils/paths';
import {  AuthSignInError } from '@js-camp/core/models/auth-errors';
import { NotificationService } from '@js-camp/angular/core/services/notification.service';
import { SignInFormService } from '@js-camp/angular/core/services/sign-in-form.service';
import { FieldEmailComponent } from '@js-camp/angular/app/features/auth/field-email/field-email.component';
import { FieldPasswordComponent } from '@js-camp/angular/app/features/auth/field-password/field-password.component';
import { AUTH_SERVER_ERROR_FIELD } from '@js-camp/angular/shared/constants';

/** Sign In component. */
@Component({
	selector: 'camp-sign-in',
	standalone: true,
	templateUrl: './sign-in.component.html',
	styleUrls: ['../auth.component.css', './sign-in.component.css'],
	imports: [RouterModule, ReactiveFormsModule, FieldEmailComponent, FieldPasswordComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
	@ViewChildren('formField')
	private formFields: QueryList<FieldEmailComponent | FieldPasswordComponent> | null = null;

	private readonly router = inject(Router);

	private readonly userService = inject(UserService);

	private readonly notificationService = inject(NotificationService);

	/** Form error service. */
	protected readonly formErrorService = inject(AuthFormErrorService);

	/** Form. */
	protected readonly form = inject(SignInFormService).initialize();

	/** Loading status. */
	protected readonly isLoading = signal(false);

	private forceFormFieldsDetectChanges() {
		this.formFields?.forEach(formField => formField.detectChanges());
	}

	private startLoadingSideEffect(): void {
		this.isLoading.set(true);
		this.form.disable();
	}

	private stopLoadingSideEffect(): void {
		this.isLoading.set(false);
		this.form.enable();
	}

	/** On submit. */
	protected onSubmit(): void {
		this.form.markAllAsTouched();
		this.forceFormFieldsDetectChanges();

		if (this.form.valid) {
			this.startLoadingSideEffect();

			this.userService.signIn(this.form.getRawValue())
				.pipe(
					first(),
					catchError(({ errors }) => {
						this.stopLoadingSideEffect();

						errors.forEach(({ field, message }: AuthSignInError) => {
							if (field == null) {
								this.notificationService.notifyAppError(message);
							} else {
								this.formErrorService.setError(field, AUTH_SERVER_ERROR_FIELD, message);
								this.form.controls[field].setErrors({ [AUTH_SERVER_ERROR_FIELD]: true });
							}
						});

						this.forceFormFieldsDetectChanges();
						return throwError(() => new Error('Authorization error.'));
					}),
				)
				.subscribe(() => {
					this.stopLoadingSideEffect();
					this.notificationService.notifyAppSuccess('Sign in successfully.');
					this.router.navigate([PATHS.home]);
				});
		}
	}
}
