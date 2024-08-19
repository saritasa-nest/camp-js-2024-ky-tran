import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, first, ignoreElements, merge, Observable, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SignInFormErrorService } from '@js-camp/angular/core/services/sign-in-form-error.service';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { PATHS } from '@js-camp/core/utils/paths';
import { AuthErrors } from '@js-camp/core/models/auth-errors.model';
import { NotificationService } from '@js-camp/angular/core/services/notification.service';
import { SignInFormService } from '@js-camp/angular/core/services/sign-in-form.service';

/** Sign In component. */
@Component({
	selector: 'camp-sign-in',
	standalone: true,
	templateUrl: './sign-in.component.html',
	styleUrl: './sign-in.component.css',
	imports: [RouterModule, ReactiveFormsModule, MatIconModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
	private readonly router = inject(Router);

	private readonly destroyRef = inject(DestroyRef);

	private readonly userService = inject(UserService);

	private readonly notificationService = inject(NotificationService);

	private readonly formService = inject(SignInFormService);

	/** Form error service. */
	protected readonly formErrorService = inject(SignInFormErrorService);

	/** Sign in form group. */
	protected readonly form = this.formService.initialize();

	/** Hide password signal.*/
	protected readonly hidePasswordSignal = signal(true);

	/** Show toggle hide password icon. */
	protected readonly showToggleHidePasswordIconSignal = signal(false);

	/** Email error signal. */
	protected readonly emailErrorSignal = this.formErrorService.getEmailErrorSignal();

	/** Password error signal. */
	protected readonly passwordErrorSignal = this.formErrorService.getPasswordErrorSignal();

	/** Loading status signal. */
	protected readonly isLoadingSignal = signal(false);

	/** @inheritdoc */
	public ngOnInit(): void {
		merge(this.emailChangesSideEffect$, this.passwordChangesSideEffect$)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}

	private createFormControlSideEffect<T>(control: AbstractControl<T>, callback: (value: T) => void): Observable<void> {
		return control.valueChanges.pipe(tap(callback), ignoreElements());
	}

	private emailChangesSideEffect$ = this.createFormControlSideEffect(
		this.form.controls.email,
		() => this.formErrorService.clearEmailError(),
	);

	private passwordChangesSideEffect$ = this.createFormControlSideEffect(
		this.form.controls.password,
		password => {
			this.toggleHidePasswordSideEffect(Boolean(password));
			this.formErrorService.clearPasswordError();
		},
	);

	private toggleHidePasswordSideEffect(hasPassword: boolean): void {
		this.showToggleHidePasswordIconSignal.set(hasPassword);

		if (!hasPassword) {
			this.hidePasswordSignal.set(true);
		}
	}

	/**
	 * Toggle hide password event.
	 * @param event Mouse event.
	 */
	protected onToggleHidePassword(): void {
		this.hidePasswordSignal.set(!this.hidePasswordSignal());
	}

	private getAllFormControls(): FormControl<string>[] {
		return Object.entries(this.form.controls).map(([_, formControlValue]) => formControlValue);
	}

	private startLoadingSideEffect(): void {
		this.isLoadingSignal.set(true);
		this.getAllFormControls().forEach(formControl => formControl.disable());
	}

	private finishLoadingSideEffect(): void {
		this.isLoadingSignal.set(false);
		this.getAllFormControls().forEach(formControl => formControl.enable());
	}

	/** On submit. */
	protected onSubmit(): void {
		if (!this.form.valid) {
			this.formErrorService.handleAllErrorInputsAtOnce(this.form);
			return;
		}

		this.startLoadingSideEffect();

		this.userService.signIn(this.form.getRawValue())
			.pipe(
				first(),
				tap({
					next: () => this.router.navigate([PATHS.home]),
					finalize: () => this.finishLoadingSideEffect(),
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
