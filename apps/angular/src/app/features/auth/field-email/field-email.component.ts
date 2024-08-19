import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorComponent } from '@js-camp/angular/app/features/auth/field-error/field-error.component';
import { SignInFormErrorService } from '@js-camp/angular/core/services/sign-in-form-error.service';

/** Field Email component. */
@Component({
	selector: 'camp-field-email',
	standalone: true,
	templateUrl: './field-email.component.html',
	styleUrl: '../auth.component.css',
	imports: [ReactiveFormsModule, FieldErrorComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldEmailComponent {
	/** Email control. */
	@Input({ required: true })
	public emailControl = new FormControl();

	/** Loading status. */
	@Input()
	public set isLoading(isLoading: boolean) {
		if (isLoading) {
			this.emailControl.disable();
		} else {
			this.emailControl.enable();
		}
	}

	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	/** Form error service. */
	protected readonly formErrorService = inject(SignInFormErrorService);

	/** Email error. */
	protected get emailError(): string {
		const isInvalid = this.emailControl.invalid && (this.emailControl.dirty || this.emailControl.touched);
		return isInvalid ? this.formErrorService.handleErrorMessage('email', this.emailControl.errors) : '';
	}

	/** Trigger change detection manually. */
	public detectChanges(): void {
		this.changeDetectorRef.detectChanges();
	}
}
