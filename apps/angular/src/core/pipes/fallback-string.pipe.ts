import { Pipe, PipeTransform } from '@angular/core';
import { FALL_BACK_VALUE } from '@js-camp/angular/shared/constants';

/** Pipe that returns a fallback value if the input is null or empty. */
@Pipe({ name: 'fallbackString', standalone: true })
export class FallbackString implements PipeTransform {
	/**
	 * Transforms the given value by returning a fallback value if the input is null or empty.
	 * @param value - The value to be transformed.
	 * @param fallbackString - The fallback value.
	 * @returns - The original value if it is not null or empty, otherwise the fallback value.
	 */
	public transform(value: string | null, fallbackString: string = FALL_BACK_VALUE): string {
		return (value == null || value?.length === 0) ? fallbackString : value;
	}
}
