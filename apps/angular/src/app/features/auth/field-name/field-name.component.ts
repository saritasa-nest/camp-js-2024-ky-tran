import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorComponent } from '@js-camp/angular/app/features/auth/field-error/field-error.component';
import { AuthFormErrorService } from '@js-camp/angular/core/services/auth-form-error.service';
import { createUniqueId } from '@js-camp/angular/core/utils/helpers/create-unique-id';

/** Field Name component. */
@Component({
	selector: 'camp-field-name',
	standalone: true,
	templateUrl: './field-name.component.html',
	styleUrl: '../auth.component.css',
	imports: [ReactiveFormsModule, FieldErrorComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldNameComponent {
	/** Label. */
	@Input()
	public label = 'Name';

	/** Field. */
	@Input()
	public field = 'name';

	/** Name control. */
	@Input({ required: true })
	public control = new FormControl();

	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	/** Form error service. */
	protected readonly formErrorService = inject(AuthFormErrorService);

	/** Unique id.*/
	protected readonly uniqueId = createUniqueId('field-name');

	/** Trigger change detection manually. */
	public detectChanges(): void {
		this.changeDetectorRef.detectChanges();
	}
}
