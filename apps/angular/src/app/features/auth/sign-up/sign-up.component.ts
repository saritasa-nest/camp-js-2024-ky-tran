import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SignUpFormService } from '@js-camp/angular/core/services/sign-up-form.service';
import { FieldEmailComponent } from '@js-camp/angular/app/features/auth/field-email/field-email.component';
import { FieldPasswordComponent } from '@js-camp/angular/app/features/auth/field-password/field-password.component';
import { FieldNameComponent } from '@js-camp/angular/app/features/auth/field-name/field-name.component';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { NotificationService } from '@js-camp/angular/core/services/notification.service';
import { AUTH_SERVER_ERROR_FIELD, AUTHORIZATION_ERROR_MESSAGE, SIGN_UP_MESSAGE } from '@js-camp/angular/shared/constants';
import { AuthFormErrorService } from '@js-camp/angular/core/services/auth-form-error.service';
import { AuthSignUpErrors } from '@js-camp/core/models/auth-errors';
import { PATHS } from '@js-camp/core/utils/paths';

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
	private readonly router = inject(Router);

	private readonly destroyRef = inject(DestroyRef);

	private readonly userService = inject(UserService);

	private readonly notificationService = inject(NotificationService);

	/** Form error service. */
	protected readonly formErrorService = inject(AuthFormErrorService);

	/** Sign up form group. */
	protected readonly form = inject(SignUpFormService).initialize();

	/** Loading status. */
	protected readonly isLoading = signal(false);

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

		if (this.form.valid) {
			this.startLoadingSideEffect();

			this.userService.signUp(this.form.getRawValue())
				.pipe(
					takeUntilDestroyed(this.destroyRef),
					catchError((error: unknown) => {
						if (error && typeof error === 'object' && 'errors' in error) {
							const authSignUpErrors = error.errors as AuthSignUpErrors;
							this.stopLoadingSideEffect();

							authSignUpErrors.forEach(({ field, message }) => {
								if (field == null) {
									this.notificationService.notifyAppError(message);
								} else {
									this.formErrorService.setError(field, AUTH_SERVER_ERROR_FIELD, message);
									this.form.controls[field].setErrors({ [AUTH_SERVER_ERROR_FIELD]: true });
								}
							});
						}

						return throwError(() => new Error(AUTHORIZATION_ERROR_MESSAGE));
					}),
				)
				.subscribe(() => {
					this.stopLoadingSideEffect();
					this.notificationService.notifyAppSuccess(SIGN_UP_MESSAGE);
					this.router.navigate([PATHS.signIn]);
				});
		}
	}
}
