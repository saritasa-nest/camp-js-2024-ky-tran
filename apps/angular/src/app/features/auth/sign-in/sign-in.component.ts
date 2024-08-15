import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { first, ignoreElements, merge, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PASSWORD_MIN_LENGTH, SIGN_IN_EMAIL_DEV, SIGN_IN_PASSWORD_DEV } from '@js-camp/angular/shared/constants';
import { SignInFormErrorService } from '@js-camp/angular/core/services/sign-in-form-error.service';
import { SignInForm } from '@js-camp/angular/shared/types/auth-form';
import { SignIn } from '@js-camp/core/models/sign-in';
import { AppConfig } from '@js-camp/angular/config/app.config';
import { UserService } from '@js-camp/angular/core/services/user.service';

/** Sign in component. */
@Component({
	selector: 'camp-sign-in',
	standalone: true,
	templateUrl: './sign-in.component.html',
	styleUrl: './sign-in.component.css',
	imports: [RouterModule, MatIconModule, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
	private readonly router = inject(Router);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly destroyRef = inject(DestroyRef);

	private readonly appConfig = inject(AppConfig);

	private readonly userService = inject(UserService);

	/** Form error service. */
	protected readonly formErrorService = inject(SignInFormErrorService);

	/** Sign in form group. */
	protected readonly form: SignInForm = this.formBuilder.group({
		email: [
			this.appConfig.isProduction ? '' : SIGN_IN_EMAIL_DEV,
			[Validators.email, Validators.required],
		],
		password: [
			this.appConfig.isProduction ? '' : SIGN_IN_PASSWORD_DEV,
			[Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), this.validateNonNumericPassword],
		],
	});

	/** Hide password signal. */
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
		merge(this.emailChangesSideEffect(), this.passwordChangesSideEffect())
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}

	private emailChangesSideEffect(): Observable<void> {
		return this.form.controls.email.valueChanges
			.pipe(tap(() => this.formErrorService.clearEmailError()), ignoreElements());
	}

	private passwordChangesSideEffect(): Observable<void> {
		return this.form.controls.password.valueChanges
			.pipe(
				tap(password => {
					this.toggleHidePasswordSideEffect(Boolean(password));
					this.formErrorService.clearPasswordError();
				}),
				ignoreElements(),
			);
	}

	private toggleHidePasswordSideEffect(hasPassword: boolean): void {
		this.showToggleHidePasswordIconSignal.set(hasPassword);

		if (!hasPassword) {
			this.hidePasswordSignal.set(true);
		}
	}

	private validateNonNumericPassword(control: AbstractControl): ValidationErrors | null {
		if (control.value) {
			const isNumeric = /^\d+$/.test(control.value);
			return isNumeric ? { numericPassword: true } : null;
		}

		return null;
	}

	/**
	 * Toggle hide password event.
	 * @param event Mouse event.
	 */
	protected onToggleHidePassword(): void {
		this.hidePasswordSignal.set(!this.hidePasswordSignal());
	}

	private startLoadingSideEffect(): void {
		this.isLoadingSignal.set(true);
		this.form.controls.email.disable();
		this.form.controls.password.disable();
	}

	private finishLoadingSideEffect(): void {
		this.isLoadingSignal.set(false);
		this.form.controls.email.enable();
		this.form.controls.password.enable();
	}

	/** On submit. */
	protected onSubmit(): void {
		if (!this.form.valid) {
			this.formErrorService.handleEmailError(this.form);
			this.formErrorService.handlePasswordError(this.form);
			return;
		}

		const data = this.form.getRawValue();
		const signInData: SignIn = { email: data.email, password: data.password };

		this.startLoadingSideEffect();

		// TODO (Ky Tran): handle sign in error.
		this.userService.signIn(signInData)
			.pipe(
				first(),
				tap({
					next: () => console.log('Sign in successfully!'),
					error: (error: unknown) => console.log(error),
					finalize: () => this.finishLoadingSideEffect(),
				}),
				ignoreElements(),
			)
			.subscribe();
	}
}
