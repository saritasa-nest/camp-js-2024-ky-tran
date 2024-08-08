import { AnimeTypeUrlDto } from '../dtos/anime-type-url.dto';
import { AnimeTypeDto } from '../dtos/anime.dto';
import { AnimeType } from '../models/anime.model';

/** Mapping from Domain model to DTO. */
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

/** Mapping from DTO to Domain model. */
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
