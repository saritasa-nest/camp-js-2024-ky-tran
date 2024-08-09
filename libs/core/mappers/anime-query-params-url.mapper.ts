import { inject, Injectable } from '@angular/core';

import { AnimeQueryParamsUrlDto } from '../dtos/anime-query-params-url.dto';
import { AnimeQueryParams } from '../models/anime-query-params.model';

import { BaseQueryParamsMapper } from './base-query-params.mapper';
import { SORT_FIELDS_URL_MAPPING_FROM_DTO, SORT_FIELDS_URL_MAPPING_TO_DTO } from './sort-fields-mapping.record';
import { SORT_DIRECTION_URL_MAPPING_FROM_DTO, SORT_DIRECTION_URL_MAPPING_TO_DTO } from './sort-direction-mapping.record';
import { AnimeTypeUrlMapper } from './anime-type-url.mapper';

/** Anime query params url mappers. */
@Injectable({ providedIn: 'root' })
export class AnimeQueryParamsUrlMapper {
	private readonly baseQueryParamsMapper = inject(BaseQueryParamsMapper);

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
			sortField: sortField ? SORT_FIELDS_URL_MAPPING_TO_DTO[sortField] : null,
			sortDirection: sortDirection ? SORT_DIRECTION_URL_MAPPING_TO_DTO[sortDirection] : null,
			type: type ? AnimeTypeUrlMapper.toDto(type) : null,
		};
	}

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
			sortField: sortField ? SORT_FIELDS_URL_MAPPING_FROM_DTO[sortField] : null,
			sortDirection: sortDirection ? SORT_DIRECTION_URL_MAPPING_FROM_DTO[sortDirection] : null,
			type: type ? AnimeTypeUrlMapper.fromDto(type) : null,
		};
	}
}
