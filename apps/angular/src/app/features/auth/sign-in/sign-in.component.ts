import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError, first, ignoreElements, tap, throwError } from 'rxjs';
import { AuthFormErrorService } from '@js-camp/angular/core/services/auth-form-error.service';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { PATHS } from '@js-camp/core/utils/paths';
import { AuthErrors } from '@js-camp/core/models/auth-errors';
import { NotificationService } from '@js-camp/angular/core/services/notification.service';
import { SignInFormService } from '@js-camp/angular/core/services/sign-in-form.service';
import { FieldEmailComponent } from '@js-camp/angular/app/features/auth/field-email/field-email.component';
import { FieldPasswordComponent } from '../field-password/field-password.component';

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
	private readonly router = inject(Router);

	private readonly userService = inject(UserService);

	private readonly notificationService = inject(NotificationService);

	/** Field email instance. */
	@ViewChild('email')
	private readonly fieldEmailComponent!: FieldEmailComponent;

	/** Field password instance. */
	@ViewChild('password')
	private readonly fieldPasswordComponent!: FieldPasswordComponent;

	/** Form error service. */
	protected readonly formErrorService = inject(AuthFormErrorService);

	/** Sign in form group. */
	protected readonly form = inject(SignInFormService).initialize();

	/** Loading status. */
	protected readonly isLoading = signal(false);

	/** On submit. */
	protected onSubmit(): void {
		this.form.markAllAsTouched();

		if (!this.form.valid) {
			[this.fieldEmailComponent, this.fieldPasswordComponent].forEach(c => c.detectChanges());
			return;
		}

		this.isLoading.set(true);
		this.userService.signIn(this.form.getRawValue())
			.pipe(
				first(),
				tap({
					next: () => this.router.navigate([PATHS.home]),
					finalize: () => this.isLoading.set(false),
				}),
				catchError(({ errors }) => {
					const { actionErrorMessage } = this.formErrorService.handleSubmitError(errors as AuthErrors);
					const snackbarDurationInSecond = 5;
					this.notificationService.notifyAppError(actionErrorMessage, snackbarDurationInSecond);
					return throwError(() => new Error('Authorization error.'))
				}),
				ignoreElements(),
			)
			.subscribe();
	}
}
