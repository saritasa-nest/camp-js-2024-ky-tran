import { UserSecret } from '../models/user-secret';
import { UserSecretDto } from '../dtos/user-secret.dto';

/** User secret mapper. */
export namespace UserSecretMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param userSecretDto DTO.
	 */
	export function fromDto(userSecretDto: UserSecretDto): UserSecret {
		return { accessToken: userSecretDto.access, refreshToken: userSecretDto.refresh };
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param userSecret Domain model.
	 */
	export function toDto(userSecret: UserSecret): UserSecretDto {
		return { access: userSecret.accessToken, refresh: userSecret.refreshToken };
	}
}
