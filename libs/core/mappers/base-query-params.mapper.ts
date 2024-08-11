import { BaseQueryParamsDto } from '../dtos/base-query-params.dto';
import { BaseFilterParams } from '../models/base-filter-params';

/** Base query params mapper. */
export namespace BaseQueryParamsMapper {

	/**
	 * Map paginator query params from domain model to DTO.
	 * @param paginator Domain model.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	export function mapPaginatorToDto(
		paginator: BaseFilterParams.Paginator,
		defaultPageNumber: number,
		defaultPageSize: number,
	): BaseQueryParamsDto.Paginator {
		const { pageNumber, pageSize } = paginator;

		return {
			pageNumber: pageNumber ?? defaultPageNumber,
			pageSize: pageSize ?? defaultPageSize,
		};
	}

	/**
	 * Map paginator query params from DTO to domain model.
	 * @param paginator DTO.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	export function mapPaginatorFromDto(
		paginator: BaseQueryParamsDto.Paginator,
		defaultPageNumber: number,
		defaultPageSize: number,
	): BaseFilterParams.Paginator {
		const { pageNumber, pageSize } = paginator;

		return {
			pageNumber: pageNumber ?? defaultPageNumber,
			pageSize: pageSize ?? defaultPageSize,
		};
	}

	/**
	 * Map search query params from domain model to DTO.
	 * @param search Domain model.
	 */
	export function mapSearchToDto({ search }: BaseFilterParams.Search): BaseQueryParamsDto.Search {
		return { search };
	}

	/**
	 * Map search query params from DTO to domain model.
	 * @param search DTO.
	 */
	export function mapSearchFromDto({ search }: BaseQueryParamsDto.Search): BaseFilterParams.Search {
		return { search };
	}

	/**
	 * Map base combined from Domain model to DTO.
	 * @param baseModel Domain model.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	export function mapCombinedToDto(
		baseModel: BaseFilterParams.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): BaseQueryParamsDto.Combined {
		const { pageNumber, pageSize, search } = baseModel;

		return {
			...BaseQueryParamsMapper.mapPaginatorToDto({ pageNumber, pageSize }, defaultPageNumber, defaultPageSize),
			...BaseQueryParamsMapper.mapSearchToDto({ search }),
		};
	}

	/**
	 * Map base combined from DTO to domain model.
	 * @param baseDto DTO.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	export function mapCombinedFromDto(
		baseDto: BaseQueryParamsDto.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): BaseFilterParams.Combined {
		const { pageNumber, pageSize, search } = baseDto;

		return {
			...BaseQueryParamsMapper.mapPaginatorToDto({ pageNumber, pageSize }, defaultPageNumber, defaultPageSize),
			...BaseQueryParamsMapper.mapSearchToDto({ search }),
		};
	}
}
