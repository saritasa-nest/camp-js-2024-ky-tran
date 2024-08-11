import { SortDirection } from '../models/sort-direction';
import { SortDirectionQueryParamsDto } from '../dtos/sort-direction-query-params.dto';

/** Mapping from DTO to domain model. */
export const SORT_DIRECTION_URL_MAPPING_FROM_DTO: Readonly<Record<SortDirectionQueryParamsDto, SortDirection>> = {
	[SortDirectionQueryParamsDto.Ascending]: SortDirection.Ascending,
	[SortDirectionQueryParamsDto.Descending]: SortDirection.Descending,
};

/** Mapping from domain model to DTO. */
export const SORT_DIRECTION_URL_MAPPING_TO_DTO: Readonly<Record<SortDirection, SortDirectionQueryParamsDto>> = {
	[SortDirection.Ascending]: SortDirectionQueryParamsDto.Ascending,
	[SortDirection.Descending]: SortDirectionQueryParamsDto.Descending,
};

/** Sort direction url mapper. */
export namespace SortDirectionUrlMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param directionDto DTO.
	 */
	export function fromDto(directionDto: SortDirectionQueryParamsDto): SortDirection {
		return SORT_DIRECTION_URL_MAPPING_FROM_DTO[directionDto];
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param directionModel Domain model.
	 */
	export function toDto(directionModel: SortDirection): SortDirectionQueryParamsDto {
		return SORT_DIRECTION_URL_MAPPING_TO_DTO[directionModel];
	}
}
