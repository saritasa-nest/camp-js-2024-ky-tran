import {
	AuthSignInErrorDto,
	AuthSignInErrorsDto,
	AuthSignInFieldErrorDto,
	AuthSignUpErrorDto,
	AuthSignUpErrorsDto,
	AuthSignUpFieldErrorDto,
} from '../dtos/auth-errors.dto';
import {
	AuthSignInError,
	AuthSignInErrors,
	AuthSignInFieldError,
	AuthSignUpError,
	AuthSignUpErrors,
	AuthSignUpFieldError,
} from '../models/auth-errors';

const AUTH_SIGN_IN_FIELD_ERROR_FROM_DTO: Readonly<Record<AuthSignInFieldErrorDto, AuthSignInFieldError>> = {
	[AuthSignInFieldErrorDto.Email]: AuthSignInFieldError.Email,
	[AuthSignInFieldErrorDto.Password]: AuthSignInFieldError.Password,
};

const AUTH_SIGN_UP_FIELD_ERROR_FROM_DTO: Readonly<Record<AuthSignUpFieldErrorDto, AuthSignUpFieldError>> = {
	[AuthSignUpFieldErrorDto.Email]: AuthSignUpFieldError.Email,
	[AuthSignUpFieldErrorDto.Password]: AuthSignUpFieldError.Password,
	[AuthSignUpFieldErrorDto.FirstName]: AuthSignUpFieldError.FirstName,
	[AuthSignUpFieldErrorDto.LastName]: AuthSignUpFieldError.LastName,
};

/** Auth errors mapper. */
export namespace AuthErrorsMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param dto DTO.
	 */
	export function signInErrorFromDto(dto: AuthSignInErrorDto): AuthSignInError {
		const field: AuthSignInFieldError | null = { ...AUTH_SIGN_IN_FIELD_ERROR_FROM_DTO }[dto.attr] ?? null;
		return { field, message: dto.detail };
	}

	/**
	 * Mapping from DTO to domain model.
	 * @param dto DTO.
	 */
	export function signInFromDto(dto: AuthSignInErrorsDto): AuthSignInErrors {
		return dto.map(errorDto => signInErrorFromDto(errorDto));
	}

	/**
	 * Mapping from DTO to domain model.
	 * @param dto DTO.
	 */
	export function signUpErrorFromDto(dto: AuthSignUpErrorDto): AuthSignUpError {
		const field: AuthSignUpFieldError | null = { ...AUTH_SIGN_UP_FIELD_ERROR_FROM_DTO }[dto.attr] ?? null;
		return { field, message: dto.detail };
	}

	/**
	 * Mapping from DTO to domain model.
	 * @param dto DTO.
	 */
	export function signUpFromDto(dto: AuthSignUpErrorsDto): AuthSignUpErrors {
		return dto.map(errorDto => signUpErrorFromDto(errorDto));
	}
}
