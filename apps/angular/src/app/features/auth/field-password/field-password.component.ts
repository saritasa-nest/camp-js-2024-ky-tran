import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { FormFieldService } from '@js-camp/angular/core/services/form-field.service';
import { FieldErrorComponent } from '@js-camp/angular/app/features/auth/field-error/field-error.component';
import { createUniqueId } from '@js-camp/angular/core/utils/helpers/create-unique-id';

/** Field Password component. */
@Component({
	selector: 'camp-field-password',
	standalone: true,
	templateUrl: './field-password.component.html',
	styleUrl: '../auth.component.css',
	imports: [CommonModule, ReactiveFormsModule, MatIconModule, FieldErrorComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldPasswordComponent implements OnInit {
	/** Label. */
	@Input()
	public label = 'Password';

	/** Field. */
	@Input()
	public field = 'password';

	/** Password control. */
	@Input({ required: true })
	public passwordControl!: FormControl;

	private readonly formFieldService = inject(FormFieldService);

	/** Weather the form field is invalid to display error message. */
	protected isInvalid$: Observable<boolean> | null = null;

	/** @inheritdoc */
	public ngOnInit(): void {
		this.isInvalid$ = this.formFieldService.createIsInvalidObservable(this.passwordControl);
	}

	/** Unique id.*/
	protected readonly uniqueId = createUniqueId(this.field);

	/** Weather password is hidden.*/
	protected readonly isPasswordHidden = signal(true);

	/**
	 * On toggle password.
	 * @param event Mouse event.
	 */
	protected onTogglePassword(): void {
		this.isPasswordHidden.set(!this.isPasswordHidden());
	}
}
