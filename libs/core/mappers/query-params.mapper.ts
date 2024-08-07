import { SortDirection } from '../models/sort-direction.model';
import { SORT_FIELDS_MAPPING_TO_DTO, SORT_FIELDS_URL_MAPPING_FROM_DTO, SORT_FIELDS_URL_MAPPING_TO_DTO } from '../records/sort-fields-mapping.record';
import { TYPE_MAPPING_TO_DTO, TYPE_URL_MAPPING_FROM_DTO, TYPE_URL_MAPPING_TO_DTO } from '../records/type-mapping.record';
import { SortEventDirectionDto, SortEventDto } from '../dtos/sort-event.dto';
import { SortFields } from '../models/sort-fields.model';
import { SORT_DIRECTION_URL_MAPPING_FROM_DTO, SORT_DIRECTION_URL_MAPPING_TO_DTO } from '../records/sort-direction-mapping.record';
import { AnimeQueryParams } from '../models/anime-query-params.model';
import { AnimeQueryParamsUrlDto } from '../dtos/anime-query-params-url.dto';
import { AnimeQueryParamsDto } from '../dtos/anime-query-params.dto';

/** Query Params mapper namespace. */
export namespace QueryParamsMappers {

	/**
	 * Create query params with the provided query params and all left query params with the default value null.
	 * @param params - The provided query params.
	 */
	export function createQueryPramsUrl<T>(params: Partial<T>): T {
		const defaultQueryParams = {
			pageNumber: null,
			pageSize: null,
			sortField: null,
			sortDirection: null,
			type: null,
			search: null,
		} as T;

		return { ...defaultQueryParams, ...params };
	}

	/**
	 * Mapping from Domain model to DTO (to Url).
	 * @param model - The Query Params Domain model object to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
	 */
	export function toUrlDto(
		model: AnimeQueryParams.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): AnimeQueryParamsUrlDto.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = model;

		return {
			pageNumber: pageNumber ?? defaultPageNumber,
			pageSize: pageSize ?? defaultPageSize,
			sortField: sortField ? SORT_FIELDS_URL_MAPPING_TO_DTO[sortField] : null,
			sortDirection: sortDirection ? SORT_DIRECTION_URL_MAPPING_TO_DTO[sortDirection] : null,
			type: type ? TYPE_URL_MAPPING_TO_DTO[type] : null,
			search,
		};
	}

	/**
	 * Mapping from DTO to Domain model (from Url).
	 * @param dto - The DTO to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
	 */
	export function fromUrlDto(
		dto: AnimeQueryParamsUrlDto.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): AnimeQueryParams.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = dto;

		return {
			pageNumber: pageNumber ?? defaultPageNumber,
			pageSize: pageSize ?? defaultPageSize,
			sortField: sortField ? SORT_FIELDS_URL_MAPPING_FROM_DTO[sortField] : null,
			sortDirection: sortDirection ? SORT_DIRECTION_URL_MAPPING_FROM_DTO[sortDirection] : null,
			type: type ? TYPE_URL_MAPPING_FROM_DTO[type] : null,
			search,
		};
	}

	/**
	 * Mapping from Domain model to DTO.
	 * @param model - The Query Params Domain model object to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
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
			offset: ((pageNumber ?? defaultPageNumber) - 1) * (pageSize ?? defaultPageSize),
			limit: pageSize ?? defaultPageSize,
			ordering: hasSorting ? `${sortingSideCharacter}${SORT_FIELDS_MAPPING_TO_DTO[sortField]}` : null,
			type: type ? TYPE_MAPPING_TO_DTO[type] : null,
			search,
		};
	}

	/**
	 * Sort from event DTO to Domain model.
	 * @param dto - Sort from event dto.
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

		return { sortField: active, sortDirection };
	}

	/**
	 * Sort from event Domain model to DTO.
	 * @param model - Sort from event domain model.
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

		return { active: sortField as SortFields, direction };
	}
}
