import { SignInDto } from '../dtos/sign-in.dto';
import { SignIn } from '../models/sign-in';

/** Sign in mapper. */
export namespace SignInMapper {

	/**
	 * Mapping from domain model to DTO.
	 * @param signInModel Domain model.
	 */
	export function toDto(signInModel: SignIn): SignInDto {
		return { email: signInModel.email, password: signInModel.password };
	}
}
