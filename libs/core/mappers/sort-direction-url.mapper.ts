import { SortDirection } from '../models/sort-direction.model';
import { SortDirectionUrlDto } from '../dtos/sort-direction-url.dto';

/** Mapping from DTO to domain model. */
export const SORT_DIRECTION_URL_MAPPING_FROM_DTO: Readonly<Record<SortDirectionUrlDto, SortDirection>> = {
	[SortDirectionUrlDto.Ascending]: SortDirection.Ascending,
	[SortDirectionUrlDto.Descending]: SortDirection.Descending,
};

/** Mapping from domain model to DTO. */
export const SORT_DIRECTION_URL_MAPPING_TO_DTO: Readonly<Record<SortDirection, SortDirectionUrlDto>> = {
	[SortDirection.Ascending]: SortDirectionUrlDto.Ascending,
	[SortDirection.Descending]: SortDirectionUrlDto.Descending,
};

/** Sort direction url mapper. */
export namespace SortDirectionUrlMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param directionDto - DTO.
	 */
	export function fromDto(directionDto: SortDirectionUrlDto): SortDirection {
		return SORT_DIRECTION_URL_MAPPING_FROM_DTO[directionDto];
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param directionModel Domain model.
	 */
	export function toDto(directionModel: SortDirection): SortDirectionUrlDto {
		return SORT_DIRECTION_URL_MAPPING_TO_DTO[directionModel];
	}
}
