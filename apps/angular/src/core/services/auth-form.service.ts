import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

/** Auth form service. */
@Injectable({ providedIn: 'root' })
export class AuthFormService {
	/**
	 * Validate non numeric password.
	 * @param control Abstract control.
	 */
	protected validateNonNumericPassword(control: AbstractControl): ValidationErrors | null {
		if (control.value) {
			const isNumeric = /^\d+$/.test(control.value);
			return isNumeric ? { numericPassword: true } : null;
		}

		return null;
	}
}
