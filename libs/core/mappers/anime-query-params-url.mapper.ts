import { inject, Injectable } from '@angular/core';

import { AnimeQueryParamsUrlDto } from '../dtos/anime-query-params-url.dto';
import { AnimeQueryParams } from '../models/anime-query-params.model';

import { BaseQueryParamsMapper } from './base-query-params.mapper';
import { AnimeTypeUrlMapper } from './anime-type-url.mapper';
import { SortFieldsUrlMapper } from './sort-fields-url.mapper';
import { SortDirectionUrlMapper } from './sort-direction-url.mapper';

/** Anime query params url mappers. */
@Injectable({ providedIn: 'root' })
export class AnimeQueryParamsUrlMapper {
	private readonly baseQueryParamsMapper = inject(BaseQueryParamsMapper);

	/**
	 * Mapping from DTO to domain model.
	 * @param dto DTO.
	 * @param defaultPageNumber Default page number.
	 * @param defaultPageSize Default page size.
	 */
	public fromUrlDto(
		dto: AnimeQueryParamsUrlDto.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): AnimeQueryParams.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = dto;

		return {
			...this.baseQueryParamsMapper.mapCombinedUrlFromDto(
				{ pageNumber, pageSize, search },
				defaultPageNumber,
				defaultPageSize,
			),
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
	public toUrlDto(
		model: AnimeQueryParams.Combined,
		defaultPageNumber: number,
		defaultPageSize: number,
	): AnimeQueryParamsUrlDto.Combined {
		const { pageNumber, pageSize, sortField, sortDirection, type, search } = model;

		return {
			...this.baseQueryParamsMapper.mapCombinedUrlToDto(
				{ pageNumber, pageSize, search },
				defaultPageNumber,
				defaultPageSize,
			),
			sortField: sortField ? SortFieldsUrlMapper.toDto(sortField) : null,
			sortDirection: sortDirection ? SortDirectionUrlMapper.toDto(sortDirection) : null,
			type: type ? AnimeTypeUrlMapper.toDto(type) : null,
		};
	}
}
