import { $ } from '../utils';
import { Subscriber } from '../models';
import { InitialDisplay } from '../types';

/** Displays the initial admin view. */
export class InitialAdminDisplayer implements Subscriber<null> {
	/** The container element where the initial admin view is displayed. */
	protected readonly containerEl = $('.debug-user');

	private generateMarkup(): string {
		return `
			<div class="block">
				<div class="user__info">
					<h2 class="user__info-name">All Dice Rolls</h2>
					<span class="user__info-dash">&mdash;</span>
					<span class="user__info-result font-bold">0</span>
				</div>
				<div class="sub-block font-small main__all-rolls">Let's make a move</div>
			</div>
		`;
	}

	/** Updates the admin view by inserting the generated markup into the container element. */
	public update(): void {
		const markup = this.generateMarkup();
		this.containerEl?.insertAdjacentHTML('beforeend', markup);
	}
}

/** * Displays the initial player view. */
export class InitialPlayerDisplayer implements Subscriber<InitialDisplay> {
	private readonly containerEl = $('.users');

	private generateMarkup(playerIndex: number): string {
		return `
			<div class="block user ${playerIndex === 0 && 'active'}">
				<div class="user__info">
					<h2 class="user__info-name">Player ${playerIndex + 1}</h2>
					<span class="user__info-dash">&mdash;</span>
					<span class="user__info-result font-bold">0</span>
					<span class="user__info-in-turn font-semibold">In turn</span>
				</div>
				<div class="sub-block font-small user__results">0</div>
			</div>
		`;
	}

	/**
	 * Updates the player view by inserting the generated markup into the container element.
	 * @param playerIndex - The index of the player whose view is being updated.
	 */
	public update({ playerIndex }: InitialDisplay): void {
		const markup = this.generateMarkup(playerIndex);
		this.containerEl?.insertAdjacentHTML('beforeend', markup);
	}
}
