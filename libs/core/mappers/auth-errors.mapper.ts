import { AuthErrorDto, AuthErrorsDto, AuthErrorSignInFieldDto } from '../dtos/auth-errors.dto';
import { AuthError, AuthErrors, AuthErrorSignInField } from '../models/auth-errors';

const ERROR_SIGN_IN_FIELD_FROM_DTO: Readonly<Record<AuthErrorSignInFieldDto, AuthErrorSignInField>> = {
	[AuthErrorSignInFieldDto.Email]: AuthErrorSignInField.Email,
	[AuthErrorSignInFieldDto.Password]: AuthErrorSignInField.Password,
};

/** Auth errors mapper. */
export namespace AuthErrorsMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param dto DTO.
	 */
	export function signInErrorFromDto(dto: AuthErrorDto): AuthError {
		const field: AuthErrorSignInField | null = { ...ERROR_SIGN_IN_FIELD_FROM_DTO }[dto.attr] ?? null;
		return { field, message: dto.detail };
	}

	/**
	 * Mapping from DTO to domain model.
	 * @param errorsDto DTO.
	 */
	export function signInFromDto(errorsDto: AuthErrorsDto): AuthErrors {
		return errorsDto.map(errorDto => signInErrorFromDto(errorDto));
	}
}
