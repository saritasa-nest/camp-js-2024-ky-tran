import { Injectable } from '@angular/core';

import { BaseQueryParamsDto } from '../dtos/base-query-params.dto';
import { BaseQueryParams } from '../models/base-query-params.model';
import { BaseQueryParamsUrlDto } from '../dtos/base-query-params-url.dto';

/** Base query params mapper. */
@Injectable({ providedIn: 'root' })
export class BaseQueryParamsMapper {
	/**
	 * Map Paginator from Domain model to DTO.
	 * @param paginator - The Paginator Domain model object to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
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
	 * Map Search from Domain model to DTO.
	 * @param search - The search domain to be converted.
	 */
	public mapSearchToDto({ search }: BaseQueryParams.Search): BaseQueryParamsDto.Search {
		return { search };
	}

	/**
	 * Map Base combined from Domain model to DTO.
	 * @param baseModel - The search domain to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
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
	 * Map Paginator from Domain model to DTO - URL.
	 * @param paginator - The Paginator Domain model object to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
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
	 * Map Paginator from DTO to Domain model - URL.
	 * @param paginator - The Paginator Domain model object to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
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
	 * Map Search from Domain model to DTO - URL.
	 * @param search - The search domain to be converted.
	 */
	public mapSearchUrlToDto({ search }: BaseQueryParams.Search): BaseQueryParamsUrlDto.Search {
		return { search };
	}

	/**
	 * Map Search from DTO to Domain model - URL.
	 * @param search - The search domain to be converted.
	 */
	public mapSearchUrlFromDto({ search }: BaseQueryParamsUrlDto.Search): BaseQueryParams.Search {
		return { search };
	}

	/**
	 * Map Base combined from Domain model to DTO.
	 * @param baseModel - The search domain to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
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
	 * Map Base combined from DTO to Domain model.
	 * @param baseDto - The search domain to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
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
