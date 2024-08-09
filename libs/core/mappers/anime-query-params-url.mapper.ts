import { AnimeQueryParamsUrlDto } from '../dtos/anime-query-params-url.dto';
import { AnimeQueryParams } from '../models/anime-query-params';

import { AnimeTypeUrlMapper } from './anime-type-url.mapper';
import { SortFieldsUrlMapper } from './sort-fields-url.mapper';
import { SortDirectionUrlMapper } from './sort-direction-url.mapper';
import { BaseQueryParamsMapper } from './base-query-params.mapper';

/** Anime query params url mappers. */
export namespace AnimeQueryParamsUrlMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param dto DTO.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	export function fromUrlDto(
		dto: AnimeQueryParamsUrlDto.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): AnimeQueryParams.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = dto;

		return {
			...BaseQueryParamsMapper.mapCombinedUrlFromDto({ pageNumber, pageSize, search }, defaultPageNumber, defaultPageSize),
			sortField: sortField ? SortFieldsUrlMapper.fromDto(sortField) : null,
			sortDirection: sortDirection ? SortDirectionUrlMapper.fromDto(sortDirection) : null,
			type: type ? AnimeTypeUrlMapper.fromDto(type) : null,
		};
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param model Domain model.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	export function toUrlDto(
		model: AnimeQueryParams.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): AnimeQueryParamsUrlDto.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = model;

		return {
			...BaseQueryParamsMapper.mapCombinedUrlToDto({ pageNumber, pageSize, search }, defaultPageNumber, defaultPageSize),
			sortField: sortField ? SortFieldsUrlMapper.toDto(sortField) : null,
			sortDirection: sortDirection ? SortDirectionUrlMapper.toDto(sortDirection) : null,
			type: type ? AnimeTypeUrlMapper.toDto(type) : null,
		};
	}
}
