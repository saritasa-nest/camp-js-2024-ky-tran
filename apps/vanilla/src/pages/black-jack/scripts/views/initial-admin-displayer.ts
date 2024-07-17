import { Subscriber } from '../models/subscriber';
import { selectElement } from '../utils/elements';

/** Displays the initial admin view. */
export class InitialAdminDisplayer implements Subscriber<null> {
	/** The container element where the initial admin view is displayed. */
	protected readonly containerEl = selectElement('.admin');

	private generateMarkup(): string {
		return `
			<div class='block'>
				<div class='user__info'>
					<h2 class='user__info-name'>All Dice Rolls</h2>
					<span class='user__info-dash'>&mdash;</span>
					<span class='user__info-result font-bold'>0</span>
				</div>
				<div class='sub-block font-small main__all-rolls'>Let's make a move</div>
			</div>
		`;
	}

	/** Updates the admin view by inserting the generated markup into the container element. */
	public update(): void {
		this.containerEl.insertAdjacentHTML('beforeend', this.generateMarkup());
	}
}
