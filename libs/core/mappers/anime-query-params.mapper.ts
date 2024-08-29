import { AnimeFilterParams } from '../models/anime-filter-params';
import { AnimeQueryParams } from '../namespaces/anime-query-params';

import { AnimeTypeQueryParams, AnimeTypeQueryParamsMapper } from './anime-type-query-params';
import { SortFieldsUrlMapper } from './sort-fields-query-params.mapper';
import { SortDirectionQueryParamsMapper } from './sort-direction-query-params.mapper';
import { BaseQueryParamsMapper } from './base-query-params.mapper';

/**
 * Assert value in enum.
 * @param e Enum.
 * @param token Key.
 */
function assertValueInEnum<T extends { [s: string]: unknown; }>(e: T, token: unknown): asserts token is T[keyof T] {
	if (!Object.values(e).includes(token as T[keyof T])) {
		throw new Error(`Invalid enum value: ${token}`);
	}
}

/** Anime query params mappers. */
export namespace AnimeQueryParamsMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param dto DTO.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	export function fromDto(
		dto: AnimeQueryParams.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): AnimeFilterParams.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, typeIn, search } = dto;

		return {
			...BaseQueryParamsMapper.mapCombinedFromDto({ pageNumber, pageSize, search }, defaultPageNumber, defaultPageSize),
			sortField: sortField ? SortFieldsUrlMapper.fromDto(sortField) : null,
			sortDirection: sortDirection ? SortDirectionQueryParamsMapper.fromDto(sortDirection) : null,
			typeIn: typeIn ? typeIn.split(',').map(type => {
				assertValueInEnum(AnimeTypeQueryParams, type);
				return AnimeTypeQueryParamsMapper.fromDto(type);
			}) : null,
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
	): AnimeQueryParams.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, typeIn, search } = model;

		return {
			...BaseQueryParamsMapper.mapCombinedToDto({ pageNumber, pageSize, search }, defaultPageNumber, defaultPageSize),
			sortField: sortField ? SortFieldsUrlMapper.toDto(sortField) : null,
			sortDirection: sortDirection ? SortDirectionQueryParamsMapper.toDto(sortDirection) : null,
			typeIn: typeIn ? typeIn.map(type => AnimeTypeQueryParamsMapper.toDto(type)).join(',') : null,
		};
	}
}
