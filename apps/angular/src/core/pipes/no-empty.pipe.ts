import { Pipe, PipeTransform } from '@angular/core';

const FALL_BACK_VALUE = '--';

/** Pipe that returns a fallback value if the input is null or empty. */
@Pipe({
	name: 'noEmpty',
	standalone: true,
})
export class NoEmpty implements PipeTransform {
	/**
	 * Transforms the given value by returning a fallback value if the input is null or empty.
	 * @param value - The value to be transformed.
	 * @returns - The original value if it is not null or empty, otherwise the fallback value.
	 */
	public transform(value: string | null): string {
		return (value == null || value?.length === 0) ? FALL_BACK_VALUE : value;
	}
}
