import { Injectable } from '@angular/core';

import { AnimeStatusDto } from '../dtos/anime';
import { AnimeStatus } from '../models/anime';

/** Mapping from dto to domain model. */
export const STATUS_MAPPING_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};

/** Anime Status mapper. */
@Injectable({ providedIn: 'root' })
export class AnimeStatusMapper {
	/**
	 * Mapping from DTO to Domain model.
	 * @param statusDto - Anime status dto.
	 */
	public fromDto(statusDto: AnimeStatusDto): AnimeStatus {
		return STATUS_MAPPING_FROM_DTO[statusDto];
	}
}
