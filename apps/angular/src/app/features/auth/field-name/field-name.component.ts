import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormFieldService } from '@js-camp/angular/core/services/form-field.service';
import { FieldErrorComponent } from '@js-camp/angular/app/features/auth/field-error/field-error.component';
import { createUniqueId } from '@js-camp/angular/core/utils/helpers/create-unique-id';

/** Field Name component. */
@Component({
	selector: 'camp-field-name',
	standalone: true,
	templateUrl: './field-name.component.html',
	styleUrl: '../auth.component.css',
	imports: [CommonModule, ReactiveFormsModule, FieldErrorComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldNameComponent implements OnInit {
	/** Label. */
	@Input()
	public label = 'Name';

	/** Field. */
	@Input()
	public field = 'name';

	/** Name control. */
	@Input({ required: true })
	public control!: FormControl;

	private readonly formFieldService = inject(FormFieldService);

	/** Weather the form field is invalid to display error message. */
	protected isInvalid$: Observable<boolean> | null = null;

	/** @inheritdoc */
	public ngOnInit(): void {
		this.isInvalid$ = this.formFieldService.createIsInvalidObservable(this.control);
	}

	/** Unique id.*/
	protected readonly uniqueId = createUniqueId(this.field);
}
