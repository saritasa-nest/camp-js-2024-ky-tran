import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, map, Observable, throwError } from 'rxjs';
import { AuthMapper } from '@js-camp/core/mappers/auth.mapper';
import { SignIn, SignUp } from '@js-camp/core/models/auth';
import { UserSecret } from '@js-camp/core/models/user-secret';
import { UrlConfig } from '@js-camp/angular/config/url.config';
import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';
import { UserSecretMapper } from '@js-camp/core/mappers/user-secret.mapper';
import { AuthErrorsMapper } from '@js-camp/core/mappers/auth-errors.mapper';

/** Auth service. */
@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlConfig = inject(UrlConfig);

	/**
	 * Sign in.
	 * @param signInData Sign in data.
	 */
	public signIn(signInData: SignIn): Observable<UserSecret> {
		return this.httpClient.post<UserSecretDto>(this.urlConfig.authSignInUrl, AuthMapper.signInToDto(signInData))
			.pipe(
				first(),
				map(userSecretDto => UserSecretMapper.fromDto(userSecretDto)),
				catchError(({ error }) => throwError(() => ({ errors: AuthErrorsMapper.signInFromDto(error.errors) }))),
			);
	}

	/**
	 * Sign in refresh.
	 * @param userSecret User secret tokens.
	 */
	public signInRefresh(userSecret: UserSecret): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecretDto>(this.urlConfig.authSignInRefreshUrl, UserSecretMapper.toDto(userSecret))
			.pipe(first(), map(newUserSecret => UserSecretMapper.fromDto(newUserSecret)));
	}

	/**
	 * Sign up.
	 * @param signUpData Sign up data.
	 */
	public signUp(signUpData: SignUp): Observable<void> {
		return this.httpClient.post<void>(this.urlConfig.authSignUpUrl, AuthMapper.signUpToDto(signUpData))
			.pipe(
				first(),
				map(() => undefined),
				catchError(({ error }) => throwError(() => ({ errors: AuthErrorsMapper.signUpFromDto(error.errors) }))),
			);
	}
}
