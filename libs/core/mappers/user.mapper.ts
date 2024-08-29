import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user';

/** User mapper. */
export namespace UserMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param userDto DTO.
	 */
	export function fromDto(userDto: UserDto): User {
		return {
			email: userDto.email,
			firstName: userDto.first_name,
			lastName: userDto.last_name,
			avatar: userDto.avatar,
			createdAt: new Date(userDto.created),
			modifiedAt: new Date(userDto.modified),
		};
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param user Domain model.
	 */
	export function toDto(user: User): UserDto {
		return {
			email: user.email,
			first_name: user.firstName,
			last_name: user.lastName,
			avatar: user.avatar,
			created: user.createdAt.toISOString(),
			modified: user.modifiedAt.toISOString(),
		};
	}
}
