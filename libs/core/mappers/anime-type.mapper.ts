import { AnimeTypeDto } from '../dtos/anime.dto';
import { AnimeType } from '../models/anime.model';

/** Mapping from DTO to Domain model. */
export const TYPE_MAPPING_FROM_DTO: Readonly<Record<AnimeTypeDto, AnimeType>> = {
	[AnimeTypeDto.Tv]: AnimeType.Tv,
	[AnimeTypeDto.Ova]: AnimeType.Ova,
	[AnimeTypeDto.Movie]: AnimeType.Movie,
	[AnimeTypeDto.Special]: AnimeType.Special,
	[AnimeTypeDto.Ona]: AnimeType.Ona,
	[AnimeTypeDto.Music]: AnimeType.Music,
	[AnimeTypeDto.PromotionalVideos]: AnimeType.PromotionalVideos,
	[AnimeTypeDto.Unknown]: AnimeType.Unknown,
};

/** Anime Type mapper. */
export namespace AnimeTypeMapper {

	/**
	 * Mapping from dto to domain model.
	 * @param typeDto - Anime type dto.
	 */
	export function fromDto(typeDto: AnimeTypeDto): AnimeType {
		return TYPE_MAPPING_FROM_DTO[typeDto];
	}
}
