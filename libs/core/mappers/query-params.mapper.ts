import { QueryParamsDto, QueryParamsUrlDto } from '../dtos/query-params.dto';
import { SortDirection } from '../enums/sort-direction.enum';
import { QueryParams } from '../models/query-params.model';
import { SORT_FIELDS_MAPPING_TO_DTO } from '../records/sort-fields-mapping.record';
import { TYPE_MAPPING_FROM_DTO, TYPE_MAPPING_TO_DTO } from '../records/type-mapping.record';

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
	export function toUrlDto(model: QueryParams, defaultPageNumber: number, defaultPageSize: number): QueryParamsUrlDto {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = model;

		return {
			pageNumber: pageNumber ?? defaultPageNumber,
			pageSize: pageSize ?? defaultPageSize,
			sortField,
			sortDirection,
			type: type ? TYPE_MAPPING_TO_DTO[type] : null,
			search,
		};
	}

	/**
	 * Mapping from DTO to Domain model (from Url).
	 * @param dto - The DTO to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
	 */
	export function fromUrlDto(dto: QueryParamsUrlDto, defaultPageNumber: number, defaultPageSize: number): QueryParams {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = dto;

		return {
			pageNumber: pageNumber ?? defaultPageNumber,
			pageSize: pageSize ?? defaultPageSize,
			sortField,
			sortDirection,
			type: type ? TYPE_MAPPING_FROM_DTO[type] : null,
			search,
		};
	}

	/**
	 * Mapping from Domain model to DTO.
	 * @param model - The Query Params Domain model object to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
	 */
	export function toDto(model: QueryParams, defaultPageNumber: number, defaultPageSize: number): QueryParamsDto {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = model;

		let ordering: string | null = null;

		if (sortField && sortDirection) {
			ordering = `${sortDirection === SortDirection.Ascending ? '' : '-'}${SORT_FIELDS_MAPPING_TO_DTO[sortField]}`;
		}

		return {
			offset: ((pageNumber ?? defaultPageNumber) - 1) * (pageSize ?? defaultPageSize),
			limit: pageSize ?? defaultPageSize,
			ordering,
			type: type ? TYPE_MAPPING_TO_DTO[type] : null,
			search,
		};
	}
}
