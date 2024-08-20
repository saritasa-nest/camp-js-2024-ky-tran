import { AuthErrorDto, AuthErrorsDto } from '../dtos/auth-errors.dto';
import { AuthError, AuthErrors } from '../models/auth-errors';

/** Auth errors mapper. */
export namespace AuthErrorsMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param errorDto DTO.
	 */
	export function errorFromDto(errorDto: AuthErrorDto): AuthError {
		return { field: errorDto.attr, message: errorDto.detail };
	}

	/**
	 * Mapping from DTO to domain model.
	 * @param errorsDto DTO.
	 */
	export function fromDto(errorsDto: AuthErrorsDto): AuthErrors {
		return errorsDto.map(errorDto => errorFromDto(errorDto));
	}
}
