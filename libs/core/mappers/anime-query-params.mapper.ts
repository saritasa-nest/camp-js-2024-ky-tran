import { AnimeQueryParamsDto } from '../dtos/anime-query-params.dto';
import { AnimeFilterParams } from '../models/anime-filter-params';

import { AnimeTypeQueryParamsMapper } from './anime-type-query-params';
import { SortFieldsUrlMapper } from './sort-fields-query-params.mapper';
import { SortDirectionQueryParamsMapper } from './sort-direction-query-params.mapper';
import { BaseQueryParamsMapper } from './base-query-params.mapper';

/** Anime query params mappers. */
export namespace AnimeQueryParamsMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param dto DTO.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	export function fromDto(
		dto: AnimeQueryParamsDto.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): AnimeFilterParams.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = dto;

		return {
			...BaseQueryParamsMapper.mapCombinedFromDto({ pageNumber, pageSize, search }, defaultPageNumber, defaultPageSize),
			sortField: sortField ? SortFieldsUrlMapper.fromDto(sortField) : null,
			sortDirection: sortDirection ? SortDirectionQueryParamsMapper.fromDto(sortDirection) : null,
			type: type ? AnimeTypeQueryParamsMapper.fromDto(type) : null,
		};
	}

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
	): AnimeQueryParamsDto.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = model;

		return {
			...BaseQueryParamsMapper.mapCombinedToDto({ pageNumber, pageSize, search }, defaultPageNumber, defaultPageSize),
			sortField: sortField ? SortFieldsUrlMapper.toDto(sortField) : null,
			sortDirection: sortDirection ? SortDirectionQueryParamsMapper.toDto(sortDirection) : null,
			type: type ? AnimeTypeQueryParamsMapper.toDto(type) : null,
		};
	}
}
