import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

type ImagePopupData = Readonly<{

	/** Source. */
	imageSrc: string | null;

	/** Alternative text. */
	imageAlt: string;
}>;

/** Anime Image Popup component. */
@Component({
	selector: 'camp-anime-image-popup',
	standalone: true,
	templateUrl: './anime-image-popup.component.html',
	styleUrl: './anime-image-popup.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeImagePopupComponent {
	/** Image popup data. */
	protected readonly imagePopupData = inject<ImagePopupData>(MAT_DIALOG_DATA);
}
