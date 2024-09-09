import { AnimeOverviewDto } from '../dtos/anime-overview.dto';
import { AnimeOverview } from '../models/anime-overview';

import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';
import { DateRangeMapper } from './date-range.mapper';

/** Anime overview mapper. */
export namespace AnimeOverviewMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param dto Anime overview DTO.
	 */
	export function fromDto(dto: AnimeOverviewDto): AnimeOverview {
		return new AnimeOverview({
			id: dto.id,
			createdAt: DateRangeMapper.parseDateFromDto(dto.created),
			modifiedAt: DateRangeMapper.parseDateFromDto(dto.modified),
			imageSrc: dto.image,
			englishTitle: dto.title_eng !== '' ? dto.title_eng : null,
			japaneseTitle: dto.title_jpn !== '' ? dto.title_jpn : null,
			type: AnimeTypeMapper.fromDto(dto.type),
			status: AnimeStatusMapper.fromDto(dto.status),
			aired: DateRangeMapper.fromDto(dto.aired),
		});
	}
}
