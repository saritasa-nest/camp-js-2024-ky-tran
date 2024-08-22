import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorComponent } from '@js-camp/angular/app/features/auth/field-error/field-error.component';
import { AuthFormErrorService } from '@js-camp/angular/core/services/auth-form-error.service';
import { createUniqueId } from '@js-camp/angular/core/utils/helpers/create-unique-id';
import { combineLatest, defer, map, startWith } from 'rxjs';
import { listenControlTouched } from '@js-camp/angular/core/utils/rxjs/listenControlTouched';
import { FORM_STATUS_INVALID } from '@js-camp/angular/shared/constants';

/** Field Name component. */
@Component({
	selector: 'camp-field-name',
	standalone: true,
	templateUrl: './field-name.component.html',
	styleUrl: '../auth.component.css',
	imports: [CommonModule, ReactiveFormsModule, FieldErrorComponent],
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
	public control!: FormControl;

	/** Form error service. */
	protected readonly formErrorService = inject(AuthFormErrorService);

	private readonly isTouched$ = defer(() => listenControlTouched(this.control));

	private readonly status$ = defer(() => this.control.statusChanges.pipe(startWith(FORM_STATUS_INVALID)));

	/** Weather the form field is invalid to display error message. */
	protected readonly isInvalid$ = defer(() => combineLatest([this.isTouched$, this.status$]).pipe(
		map(([isTouched, status]) => isTouched && status === FORM_STATUS_INVALID),
	));

	/** Unique id.*/
	protected readonly uniqueId = createUniqueId(this.field);
}
