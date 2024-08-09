import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_PLACEHOLDER } from '@js-camp/angular/shared/constants';

/** Sets a placeholder if value is null or an empty string. */
@Pipe({ name: 'appNullable', standalone: true })
export class NullablePipe implements PipeTransform {
	/**
	 * Transforms the given value by returning a fallback value if the input is null or empty.
	 * @param value The value to be transformed.
	 * @param placeholder The placeholder value.
	 */
	public transform(value: string | number | undefined | null, placeholder: string = DEFAULT_PLACEHOLDER): string {
		const isEmpty = value == null || value.toString().trim() === '';
		return isEmpty ? placeholder : value.toString();
	}
}
