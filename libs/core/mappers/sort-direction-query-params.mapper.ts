import { SortDirectionQueryParams } from '../enums/sort-direction-query-params';
import { SortDirection } from '../models/sort-direction';

/** Mapping from DTO to domain model. */
export const SORT_DIRECTION_QUERY_PARAMS_MAPPING_FROM_DTO: Readonly<Record<SortDirectionQueryParams, SortDirection>> = {
	[SortDirectionQueryParams.Ascending]: SortDirection.Ascending,
	[SortDirectionQueryParams.Descending]: SortDirection.Descending,
};

/** Mapping from domain model to DTO. */
export const SORT_DIRECTION_QUERY_PARAMS_MAPPING_TO_DTO: Readonly<Record<SortDirection, SortDirectionQueryParams>> = {
	[SortDirection.Ascending]: SortDirectionQueryParams.Ascending,
	[SortDirection.Descending]: SortDirectionQueryParams.Descending,
};

/** Sort direction query params mapper. */
export namespace SortDirectionQueryParamsMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param directionDto DTO.
	 */
	export function fromDto(directionDto: SortDirectionQueryParams): SortDirection {
		return SORT_DIRECTION_QUERY_PARAMS_MAPPING_FROM_DTO[directionDto];
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param directionModel Domain model.
	 */
	export function toDto(directionModel: SortDirection): SortDirectionQueryParams {
		return SORT_DIRECTION_QUERY_PARAMS_MAPPING_TO_DTO[directionModel];
	}
}
