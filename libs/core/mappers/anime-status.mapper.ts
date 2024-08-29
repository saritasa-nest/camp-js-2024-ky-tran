import { AnimeStatusDto } from '../dtos/anime-status.dto';
import { AnimeStatus } from '../models/anime-status';

/** Mapping from DTO to domain model. */
export const STATUS_MAPPING_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};

/** Anime Status mapper. */
export namespace AnimeStatusMapper {

	/**
	 * Mapping from DTO to Domain model.
	 * @param statusDto Anime status DTO.
	 */
	export function fromDto(statusDto: AnimeStatusDto): AnimeStatus {
		return STATUS_MAPPING_FROM_DTO[statusDto];
	}
}
