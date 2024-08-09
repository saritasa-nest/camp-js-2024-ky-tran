import { AnimeType } from '../models/anime';
import { AnimeTypeUrlDto } from '../dtos/anime-type-url.dto';

/** Mapping from DTO to domain model. */
export const TYPE_URL_MAPPING_FROM_DTO: Readonly<Record<AnimeTypeUrlDto, AnimeType>> = {
	[AnimeTypeUrlDto.Tv]: AnimeType.Tv,
	[AnimeTypeUrlDto.Ova]: AnimeType.Ova,
	[AnimeTypeUrlDto.Movie]: AnimeType.Movie,
	[AnimeTypeUrlDto.Special]: AnimeType.Special,
	[AnimeTypeUrlDto.Ona]: AnimeType.Ona,
	[AnimeTypeUrlDto.Music]: AnimeType.Music,
	[AnimeTypeUrlDto.PromotionalVideos]: AnimeType.PromotionalVideos,
	[AnimeTypeUrlDto.Unknown]: AnimeType.Unknown,
};

/** Mapping from Domain model to DTO. */
export const TYPE_URL_MAPPING_TO_DTO: Readonly<Record<AnimeType, AnimeTypeUrlDto>> = {
	[AnimeType.Tv]: AnimeTypeUrlDto.Tv,
	[AnimeType.Ova]: AnimeTypeUrlDto.Ova,
	[AnimeType.Movie]: AnimeTypeUrlDto.Movie,
	[AnimeType.Special]: AnimeTypeUrlDto.Special,
	[AnimeType.Ona]: AnimeTypeUrlDto.Ona,
	[AnimeType.Music]: AnimeTypeUrlDto.Music,
	[AnimeType.PromotionalVideos]: AnimeTypeUrlDto.PromotionalVideos,
	[AnimeType.Unknown]: AnimeTypeUrlDto.Unknown,
};

/** Anime type url mapper. */
export namespace AnimeTypeUrlMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param typeDto DTO.
	 */
	export function fromDto(typeDto: AnimeTypeUrlDto): AnimeType {
		return TYPE_URL_MAPPING_FROM_DTO[typeDto];
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param typeModel Domain model.
	 */
	export function toDto(typeModel: AnimeType): AnimeTypeUrlDto {
		return TYPE_URL_MAPPING_TO_DTO[typeModel];
	}
}
