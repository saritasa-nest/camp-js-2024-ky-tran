/**
 * Remove undefined fields.
 *
 * @param obj Target object.
 */
export function removeUndefinedFields<O extends { [key: string]: unknown; }>(obj: O): Partial<O> {
	return Object.fromEntries(Object.entries(obj).filter(
		([_, value]) => value !== undefined,
	)) as Partial<O>;
}
