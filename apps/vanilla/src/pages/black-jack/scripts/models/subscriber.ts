/**
 * Interface for subscribers that receive updates of type T.
 * Defines a readonly `update` method to handle incoming values.
 * @template T The type of value that the subscriber receives.
 */
export type Subscriber<T> = {

	/**
	 * Method signature for updating subscribers with a value of type T.
	 * @template T The type of value that the subscriber receives.
	 * @param value The updated value to be processed by the subscriber.
	 */
	readonly update: (value: T) => void;
};
