import { SortDirection } from '../models/sort-direction.model';
import { SortEventDirectionDto, SortEventDto } from '../dtos/sort-event.dto';
import { AnimeQueryParams } from '../models/anime-query-params.model';
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

	/**
	 * Sort from event DTO to domain model.
	 * @param dto DTO.
	 */
	export function sortEventFromDto(dto: SortEventDto): AnimeQueryParams.Sort {
		const { active, direction } = dto;

		let sortDirection: SortDirection | null = null;

		if (direction === 'asc') {
			sortDirection = SortDirection.Ascending;
		}
		if (direction === 'desc') {
			sortDirection = SortDirection.Descending;
		}
		if (direction === '') {
			sortDirection = null;
		}

		if (sortDirection === null) {
			return { sortField: null, sortDirection: null };
		}

		return { sortField: active ? active : null, sortDirection };
	}

	/**
	 * Sort from event domain model to DTO.
	 * @param model Domain model.
	 */
	export function sortEventToDto(model: AnimeQueryParams.Sort): SortEventDto {
		const { sortField, sortDirection } = model;

		let direction: SortEventDirectionDto = '';

		if (sortDirection === SortDirection.Ascending) {
			direction = 'asc';
		}
		if (sortDirection === SortDirection.Descending) {
			direction = 'desc';
		}
		if (sortDirection === null) {
			direction = '';
		}

		return { active: sortField ? sortField : '', direction };
	}
}
