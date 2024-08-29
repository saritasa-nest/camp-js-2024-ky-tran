import { SignInDto, SignUpDto } from '../dtos/auth.dto';
import { SignIn, SignUp } from '../models/auth';

/** Auth mapper. */
export namespace AuthMapper {

	/**
	 * Mapping from domain model to DTO.
	 * @param model Domain model.
	 */
	export function signInToDto(model: SignIn): SignInDto {
		return { email: model.email, password: model.password };
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param model Domain model.
	 */
	export function signUpToDto(model: SignUp): SignUpDto {
		return {
			email: model.email,
			first_name: model.firstName,
			last_name: model.lastName,
			password: model.password,
		};
	}
}
