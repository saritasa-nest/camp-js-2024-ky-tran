import { StudioDto } from '../dtos/studio.dto';
import { Studio } from '../models/studio';

export namespace StudioMapper {

	/**
	 * Maps DTO to domain model.
	 * @param dto Genre DTO.
	 */
	export function fromDto(dto: StudioDto): Studio {
		return new Studio({
			id: dto.id,
			name: dto.name,
			imageSrc: dto.image,
		});
	}
}
