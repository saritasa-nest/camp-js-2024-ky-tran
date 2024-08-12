import { SortDirection } from '../models/sort-direction';
import { AnimeFilterParams } from '../models/anime-filter-params';
import { AnimeFilterParamsDto } from '../dtos/anime-filter-params.dto';

import { BaseFilterParamsMapper } from './base-filter-params.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';
import { SortFieldsMapper } from './sort-fields.mapper';

/** Anime filter params mappers. */
export namespace AnimeFilterParamsMapper {

	/**
	 * Mapping from domain model to DTO.
	 * @param model Domain model.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	export function toDto(
		model: AnimeFilterParams.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): AnimeFilterParamsDto.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, typeIn, search } = model;
		const hasSorting = sortField && sortDirection;
		const sortingSideCharacter = sortDirection === SortDirection.Ascending ? '' : '-';

		return {
			...BaseFilterParamsMapper.mapCombinedToDto({ pageNumber, pageSize, search }, defaultPageNumber, defaultPageSize),
			ordering: hasSorting ? `${sortingSideCharacter}${SortFieldsMapper.toDto(sortField)}` : null,
			type__in: typeIn ? typeIn.map(type => AnimeTypeMapper.toDto(type)).join(',') : null,
		};
	}
}
