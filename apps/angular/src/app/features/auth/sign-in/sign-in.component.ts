import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

/** Sign In component. */
@Component({
	selector: 'camp-sign-in',
	standalone: true,
	templateUrl: './sign-in.component.html',
	styleUrl: './sign-in.component.css',
	imports: [RouterModule, MatIconModule, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly destroyRef = inject(DestroyRef);

	/** Sign in form group. */
	protected readonly form = this.formBuilder.group({
		email: ['', [Validators.email, Validators.required]],
		password: ['', [Validators.required, Validators.minLength(8), this.validateNonNumericPassword]],
	});

	/** Hide password signal. */
	protected readonly hidePassword = signal(true);

	/** Show toggle hide password icon. */
	protected readonly showToggleHidePasswordIcon = signal(false);

	/** @inheritdoc */
	public ngOnInit(): void {
		this.form.controls.password.valueChanges
			.pipe(
				tap(password => this.toggleHidePasswordSideEffect(Boolean(password))),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	private toggleHidePasswordSideEffect(hasPassword: boolean): void {
		this.showToggleHidePasswordIcon.set(hasPassword);

		if (!hasPassword) {
			this.hidePassword.set(true);
		}
	}

	private validateNonNumericPassword(control: AbstractControl): ValidationErrors | null {
		if (!control.value) {
			return null;
		}

		const isNumeric = /^\d+$/.test(control.value);
		return isNumeric ? { numericPassword: true } : null;
	}

	/**
	 * Toggle hide password event.
	 * @param event Mouse event.
	 */
	protected onToggleHidePassword(): void {
		this.hidePassword.set(!this.hidePassword());
	}

	/** On submit. */
	protected onSubmit(): void {
		console.log('Is form valid -->', this.form.valid);
		console.log(this.form);
	}
}
