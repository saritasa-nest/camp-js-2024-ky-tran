/** Override-a-property-to-be-non-nullable. */
export type NonNullableFields<T> = {
	[U in keyof T]: NonNullable<T[U]>;
};
