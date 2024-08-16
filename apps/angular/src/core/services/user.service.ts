import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { UserStorageService } from '@js-camp/angular/core/services/user-storage.service';
import { SignIn } from '@js-camp/core/models/sign-in';
import { UrlConfig } from '@js-camp/angular/config/url.config';
import { User } from '@js-camp/core/models/user';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { UserSecret } from '@js-camp/core/models/user-secret';

/** User serivce. */
@Injectable({ providedIn: 'root' })
export class UserService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlConfig = inject(UrlConfig);

	private readonly authService = inject(AuthService);

	private readonly userStorageService = inject(UserStorageService);

	/** The. `null` when a user is not logged in. */
	public readonly user$ = this.initUserStream();

	/** If the user is authorized. */
	public readonly isAuthorized$ = this.user$.pipe(map(user => user != null));

	private getUser(): Observable<User> {
		return this.httpClient.get<UserDto>(this.urlConfig.usersProfileUrl)
			.pipe(map(data => UserMapper.fromDto(data)));
	}

	private initUserStream(): Observable<User | null> {
		return this.userStorageService.secret$.pipe(
			switchMap(userSecret => userSecret ? this.getUser() : of(null)),
			shareReplay({ bufferSize: 1, refCount: false }),
		);
	}

	/**
	 * Sign in.
	 * @param signInData Sign in data.
	 */
	public signIn(signInData: SignIn): Observable<void> {

		return this.authService.signIn(signInData).pipe(
			first(),
			switchMap(userSecret => this.userStorageService.saveSecret(userSecret)),
			map(() => undefined),
		);
	}

	/** Sign out. */
	public signOut(): Observable<void> {
		return this.userStorageService.removeSecret();
	}

	/** Sign in refresh. */
	public signInRefresh(): Observable<UserSecret> {
		return this.userStorageService.secret$.pipe(
			first(),
			switchMap(userSecret => userSecret ? this.authService.signInRefresh(userSecret) : of(null)),
			switchMap(newUserSecret => this.userStorageService.saveSecret(newUserSecret ?? { accessToken: '', refreshToken: '' })),
		);
	}
}
