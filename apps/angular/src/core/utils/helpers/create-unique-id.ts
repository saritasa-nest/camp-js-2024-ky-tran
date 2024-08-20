/**
 * Create unique id.
 * @param field Field name.
 * @param character Custom character.
 */
export function createUniqueId(field: string, character = '-'): string {
	return [field, Math.random(), Date.now()].join(character);
}
