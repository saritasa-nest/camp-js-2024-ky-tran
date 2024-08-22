import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { PATHS } from '@js-camp/core/utils/paths';
import { NotificationService } from '@js-camp/angular/core/services/notification.service';
import { SIGN_OUT_MESSAGE } from '@js-camp/angular/shared/constants';

/** User Profile component. */
@Component({
	selector: 'camp-user-profile',
	standalone: true,
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.css',
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
	private readonly router = inject(Router);

	private readonly notificationService = inject(NotificationService);

	/** User service. */
	protected readonly userService = inject(UserService);

	/** Default user image url. */
	protected readonly defaultUserImageUrl = 'https://book-catalog-internship.web.app/images/user.png';

	/** On sign out. */
	protected onSignOut(): void {
		this.userService.signOut().pipe(first())
			.subscribe(() => this.router.navigate([PATHS.signIn]));

		this.notificationService.notifyAppSuccess(SIGN_OUT_MESSAGE);
	}
}
