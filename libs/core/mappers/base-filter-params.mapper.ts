import { BaseFilterParamsDto } from '../dtos/base-filter-params.dto';
import { BaseFilterParams } from '../models/base-filter-params';

/** Base filter params mapper. */
export namespace BaseFilterParamsMapper {

	/**
	 * Map paginator from domain model to DTO.
	 * @param paginator Domain model.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	export function mapPaginatorToDto(
		paginator: BaseFilterParams.Paginator,
		defaultPageNumber: number,
		defaultPageSize: number,
	): BaseFilterParamsDto.Paginator {
		const { pageNumber, pageSize } = paginator;

		return {
			offset: ((pageNumber ?? defaultPageNumber) - 1) * (pageSize ?? defaultPageSize),
			limit: pageSize ?? defaultPageSize,
		};
	}

	/**
	 * Map Search from domain model to DTO.
	 * @param search Domain model.
	 */
	export function mapSearchToDto({ search }: BaseFilterParams.Search): BaseFilterParamsDto.Search {
		return { search };
	}

	/**
	 * Map base combined from domain model to DTO.
	 * @param baseModel Domain model.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	export function mapCombinedToDto(
		baseModel: BaseFilterParams.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): BaseFilterParamsDto.Combined {
		const { pageNumber, pageSize, search } = baseModel;

		return {
			...BaseFilterParamsMapper.mapPaginatorToDto({ pageNumber, pageSize }, defaultPageNumber, defaultPageSize),
			...BaseFilterParamsMapper.mapSearchToDto({ search }),
		};
	}
}
