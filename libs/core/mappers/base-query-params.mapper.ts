import { Injectable } from '@angular/core';

import { BaseQueryParamsDto } from '../dtos/base-query-params.dto';
import { BaseQueryParams } from '../models/base-query-params.model';
import { BaseQueryParamsUrlDto } from '../dtos/base-query-params-url.dto';

/** Base query params mapper. */
@Injectable({ providedIn: 'root' })
export class BaseQueryParamsMapper {
	/**
	 * Map paginator from domain model to DTO.
	 * @param paginator Domain model.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	public mapPaginatorToDto(
		paginator: BaseQueryParams.Paginator,
		defaultPageNumber: number,
		defaultPageSize: number,
	): BaseQueryParamsDto.Paginator {
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
	public mapSearchToDto({ search }: BaseQueryParams.Search): BaseQueryParamsDto.Search {
		return { search };
	}

	/**
	 * Map base combined from domain model to DTO.
	 * @param baseModel Domain model.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	public mapCombinedToDto(
		baseModel: BaseQueryParams.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): BaseQueryParamsDto.Combined {
		const { pageNumber, pageSize, search } = baseModel;

		return {
			...this.mapPaginatorToDto({ pageNumber, pageSize }, defaultPageNumber, defaultPageSize),
			...this.mapSearchToDto({ search }),
		};
	}

	/**
	 * Map paginator url from domain model to DTO.
	 * @param paginator Domain model.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	public mapPaginatorUrlToDto(
		paginator: BaseQueryParams.Paginator,
		defaultPageNumber: number,
		defaultPageSize: number,
	): BaseQueryParamsUrlDto.Paginator {
		const { pageNumber, pageSize } = paginator;

		return {
			pageNumber: pageNumber ?? defaultPageNumber,
			pageSize: pageSize ?? defaultPageSize,
		};
	}

	/**
	 * Map paginator url from DTO to domain model.
	 * @param paginator DTO.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	public mapPaginatorUrlFromDto(
		paginator: BaseQueryParamsUrlDto.Paginator,
		defaultPageNumber: number,
		defaultPageSize: number,
	): BaseQueryParams.Paginator {
		const { pageNumber, pageSize } = paginator;

		return {
			pageNumber: pageNumber ?? defaultPageNumber,
			pageSize: pageSize ?? defaultPageSize,
		};
	}

	/**
	 * Map search from domain model to DTO.
	 * @param search Domain model.
	 */
	public mapSearchUrlToDto({ search }: BaseQueryParams.Search): BaseQueryParamsUrlDto.Search {
		return { search };
	}

	/**
	 * Map search from DTO to domain model.
	 * @param search DTO.
	 */
	public mapSearchUrlFromDto({ search }: BaseQueryParamsUrlDto.Search): BaseQueryParams.Search {
		return { search };
	}

	/**
	 * Map base combined from Domain model to DTO.
	 * @param baseModel Domain model.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	public mapCombinedUrlToDto(
		baseModel: BaseQueryParams.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): BaseQueryParamsUrlDto.Combined {
		const { pageNumber, pageSize, search } = baseModel;

		return {
			...this.mapPaginatorUrlToDto({ pageNumber, pageSize }, defaultPageNumber, defaultPageSize),
			...this.mapSearchUrlToDto({ search }),
		};
	}

	/**
	 * Map base combined from DTO to domain model.
	 * @param baseDto DTO.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	public mapCombinedUrlFromDto(
		baseDto: BaseQueryParamsUrlDto.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): BaseQueryParams.Combined {
		const { pageNumber, pageSize, search } = baseDto;

		return {
			...this.mapPaginatorUrlToDto({ pageNumber, pageSize }, defaultPageNumber, defaultPageSize),
			...this.mapSearchUrlToDto({ search }),
		};
	}
}
