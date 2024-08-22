/**
 * Create unique id.
 * @param field Field name.
 * @param length Length.
 */
export function createUniqueId(field: string, length: number = 16): string {
	const randomString = Array.from(crypto.getRandomValues(new Uint8Array(length)))
		.map(b => b.toString(length).padStart(2, '0'))
		.join('');

	return `${field}-${randomString}`;
}
