import { Subscriber } from './subscriber';

/**
 * Publisher class that manages subscribers and notifies them with value of type T.
 * @template T - The type of value to be published to subscribers.
 */
export class Publisher<T> {
	private readonly subscribers: Set<Subscriber<T>> = new Set();

	/**
	 * Subscribes a new subscriber to receive notifications.
	 * @param subscriber - The subscriber to subscribe.
	 */
	public subscribe(subscriber: Subscriber<T>): void {
		this.subscribers.add(subscriber);
	}

	/**
	 * Unsubscribes a subscriber from receiving notifications.
	 * @param subscriber - The subscriber to unsubscribe.
	 */
	public unsubscribe(subscriber: Subscriber<T>): void {
		this.subscribers.delete(subscriber);
	}

	/**
	 * Notifies all subscribers with the given value.
	 * @param value - The value to notify subscribers with.
	 */
	public notify(value: T): void {
		this.subscribers.forEach(sub => sub.update(value));
	}
}
