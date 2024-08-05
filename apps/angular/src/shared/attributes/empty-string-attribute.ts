/**
 * Empty string attribute transform.
 * @param value - String value.
 */
export function emptyStringAttribute(value: string | null): string {
	return value ? value : '';
}
