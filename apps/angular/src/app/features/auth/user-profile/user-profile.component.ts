import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { first, ignoreElements } from 'rxjs';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { PATHS } from '@js-camp/core/utils/paths';

/** User Profile component. */
@Component({
	selector: 'camp-user-profile',
	standalone: true,
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
	private readonly userService = inject(UserService);

	private readonly router = inject(Router);

	/** On sign out. */
	protected onSignOut(): void {
		this.userService.signout()
			.pipe(first(), ignoreElements())
			.subscribe(() => this.router.navigate([PATHS.signIn]));
	}
}
