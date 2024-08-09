import { SortDirection } from '../models/sort-direction';
import { AnimeQueryParams } from '../models/anime-query-params';
import { AnimeQueryParamsDto } from '../dtos/anime-query-params.dto';

import { BaseQueryParamsMapper } from './base-query-params.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';
import { SortFieldsMapper } from './sort-fields.mapper';

/** Anime query params mappers. */
export namespace AnimeQueryParamsMapper {

	/**
	 * Mapping from domain model to DTO.
	 * @param model Domain model.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	export function toDto(
		model: AnimeQueryParams.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): AnimeQueryParamsDto.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = model;
		const hasSorting = sortField && sortDirection;
		const sortingSideCharacter = sortDirection === SortDirection.Ascending ? '' : '-';

		return {
			...BaseQueryParamsMapper.mapCombinedToDto({ pageNumber, pageSize, search }, defaultPageNumber, defaultPageSize),
			ordering: hasSorting ? `${sortingSideCharacter}${SortFieldsMapper.toDto(sortField)}` : null,
			type: type ? AnimeTypeMapper.toDto(type) : null,
		};
	}
}
