import { AnimeStatus, AnimeStatusDto } from '../enums/anime-status';

/** Mapping from DTO to Domain model. */
export const STATUS_MAPPING_FROM_DTO: Record<AnimeStatusDto, AnimeStatus> = {
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};
