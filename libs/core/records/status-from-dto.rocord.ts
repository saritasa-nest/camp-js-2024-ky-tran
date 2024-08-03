import { AnimeStatusDto } from '../dtos/anime.dto';
import { AnimeStatus } from '../models/anime.model';

/** Mapping from DTO to Domain model. */
export const STATUS_MAPPING_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};
