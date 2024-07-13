import { Subscriber } from './subscriber';

/**
 * Publisher class that manages subscribers and notifies them with values of type T.
 * @template T - The type of value to be published to subscribers.
 */
export class Publisher<T> {
	private readonly subscribers: Subscriber<T>[] = [];

	/**
	 * Subscribes a new subscriber to receive notifications.
	 * @param subscriber - The subscriber to subscribe.
	 */
	public subscribe(subscriber: Subscriber<T>): void {
		const subIdx = this.getSubscriberIndex(subscriber);

		if (subIdx === -1) {
			this.subscribers.push(subscriber);
		}
	}

	/**
	 * Unsubscribes a subscriber from receiving notifications.
	 * @param subscriber - The subscriber to unsubscribe.
	 */
	public unsubscribe(subscriber: Subscriber<T>): void {
		const subIdx = this.getSubscriberIndex(subscriber);

		if (subIdx !== -1) {
			this.subscribers.splice(subIdx, 1);
		}
	}

	/**
	 * Notifies all subscribers with the given value.
	 * @param value - The value to notify subscribers with.
	 */
	public notify(value: T): void {
		this.subscribers.forEach(sub => sub.update(value));
	}

	private getSubscriberIndex(subscriber: Subscriber<T>): number {
		return this.subscribers.findIndex(sub => sub === subscriber);
	}
}
