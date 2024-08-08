import { inject, Injectable } from '@angular/core';

import { SortDirection } from '../models/sort-direction.model';
import { SORT_FIELDS_MAPPING_TO_DTO } from '../records/sort-fields-mapping.record';
import { TYPE_MAPPING_TO_DTO } from '../records/type-mapping.record';
import { SortEventDirectionDto, SortEventDto } from '../dtos/sort-event.dto';
import { AnimeQueryParams } from '../models/anime-query-params.model';
import { AnimeQueryParamsDto } from '../dtos/anime-query-params.dto';

import { BaseQueryParamsMapper } from './base-query-params.mapper';

/** Anime query params mappers. */
@Injectable({ providedIn: 'root' })
export class AnimeQueryParamsMapper {
	private readonly baseQueryParamsMapper = inject(BaseQueryParamsMapper);

	/**
	 * Mapping from Domain model to DTO.
	 * @param model - The Query Params Domain model object to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
	 */
	public toDto(
		model: AnimeQueryParams.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): AnimeQueryParamsDto.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = model;

		const hasSorting = sortField && sortDirection;
		const sortingSideCharacter = sortDirection === SortDirection.Ascending ? '' : '-';

		return {
			...this.baseQueryParamsMapper.mapCombinedToDto(
				{ pageNumber, pageSize, search },
				defaultPageNumber,
				defaultPageSize,
			),
			ordering: hasSorting ? `${sortingSideCharacter}${SORT_FIELDS_MAPPING_TO_DTO[sortField]}` : null,
			type: type ? TYPE_MAPPING_TO_DTO[type] : null,
		};
	}

	/**
	 * Sort from event DTO to Domain model.
	 * @param dto - Sort from event dto.
	 */
	public sortEventFromDto(dto: SortEventDto): AnimeQueryParams.Sort {
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
	 * Sort from event Domain model to DTO.
	 * @param model - Sort from event domain model.
	 */
	public sortEventToDto(model: AnimeQueryParams.Sort): SortEventDto {
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
