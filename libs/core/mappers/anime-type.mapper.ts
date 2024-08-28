import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { AnimeType } from '../models/anime-type';

/** Mapping from DTO to domain model. */
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

/** Mapping from domain model to DTO. */
export const TYPE_MAPPING_TO_DTO: Readonly<Record<AnimeType, AnimeTypeDto>> = {
	[AnimeType.Tv]: AnimeTypeDto.Tv,
	[AnimeType.Ova]: AnimeTypeDto.Ova,
	[AnimeType.Movie]: AnimeTypeDto.Movie,
	[AnimeType.Special]: AnimeTypeDto.Special,
	[AnimeType.Ona]: AnimeTypeDto.Ona,
	[AnimeType.Music]: AnimeTypeDto.Music,
	[AnimeType.PromotionalVideos]: AnimeTypeDto.PromotionalVideos,
	[AnimeType.Unknown]: AnimeTypeDto.Unknown,
};

/** Anime type mapper. */
export namespace AnimeTypeMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param typeDto DTO.
	 */
	export function fromDto(typeDto: AnimeTypeDto): AnimeType {
		return TYPE_MAPPING_FROM_DTO[typeDto];
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param typeModel Domain model.
	 */
	export function toDto(typeModel: AnimeType): AnimeTypeDto {
		return TYPE_MAPPING_TO_DTO[typeModel];
	}
}
