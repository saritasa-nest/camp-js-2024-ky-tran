import { SortDirectionUrlDto } from '../dtos/sort-direction-url.dto';
import { SortDirectionDto } from '../dtos/sort-direction.dto';
import { SortDirection } from '../models/sort-direction.model';

/** Mapping from Domain model to DTO. */
export const SORT_DIRECTION_MAPPING_TO_DTO: Readonly<Record<SortDirection, SortDirectionDto>> = {
	[SortDirection.Ascending]: SortDirectionDto.Ascending,
	[SortDirection.Descending]: SortDirectionDto.Descending,
};

/** Mapping from Domain model to DTO. */
export const SORT_DIRECTION_URL_MAPPING_TO_DTO: Readonly<Record<SortDirection, SortDirectionUrlDto>> = {
	[SortDirection.Ascending]: SortDirectionUrlDto.Ascending,
	[SortDirection.Descending]: SortDirectionUrlDto.Descending,
};

/** Mapping from DTO to Domain model. */
export const SORT_DIRECTION_MAPPING_FROM_DTO: Readonly<Record<SortDirectionDto, SortDirection>> = {
	[SortDirectionDto.Ascending]: SortDirection.Ascending,
	[SortDirectionDto.Descending]: SortDirection.Descending,
};

/** Mapping from DTO to Domain model. */
export const SORT_DIRECTION_URL_MAPPING_FROM_DTO: Readonly<Record<SortDirectionUrlDto, SortDirection>> = {
	[SortDirectionUrlDto.Ascending]: SortDirection.Ascending,
	[SortDirectionUrlDto.Descending]: SortDirection.Descending,
};
