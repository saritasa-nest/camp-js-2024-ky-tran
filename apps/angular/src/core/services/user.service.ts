import { inject, Injectable } from '@angular/core';
import { first, map, Observable, tap } from 'rxjs';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { SignIn } from '@js-camp/core/models/sign-in';

/** User serivce. */
@Injectable({ providedIn: 'root' })
export class UserService {
	private readonly authService = inject(AuthService);

	/**
	 * Sign in.
	 * @param signInData Sign in data.
	 */
	public signIn(signInData: SignIn): Observable<void> {
		return this.authService.signIn(signInData).pipe(
			first(),
			tap(userSecret => console.log('===>', userSecret)),
			map(() => undefined),
		);
	}
}
