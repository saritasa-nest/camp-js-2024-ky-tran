import { inject, Injectable } from '@angular/core';

import { AnimeQueryParamsUrlDto } from '../dtos/anime-query-params-url.dto';
import { AnimeQueryParams } from '../models/anime-query-params.model';
import { SORT_DIRECTION_URL_MAPPING_FROM_DTO, SORT_DIRECTION_URL_MAPPING_TO_DTO } from '../records/sort-direction-mapping.record';
import { SORT_FIELDS_URL_MAPPING_FROM_DTO, SORT_FIELDS_URL_MAPPING_TO_DTO } from '../records/sort-fields-mapping.record';
import { TYPE_URL_MAPPING_FROM_DTO, TYPE_URL_MAPPING_TO_DTO } from '../records/type-mapping.record';

import { BaseQueryParamsMapper } from './base-query-params.mapper';

/** Anime query params Url mappers. */
@Injectable({ providedIn: 'root' })
export class AnimeQueryParamsUrlMapper {
	private readonly baseQueryParamsMapper = inject(BaseQueryParamsMapper);

	/**
	 * Mapping from Domain model to DTO (to Url).
	 * @param model - The Query Params Domain model object to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
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
			type: type ? TYPE_URL_MAPPING_TO_DTO[type] : null,
		};
	}

	/**
	 * Mapping from DTO to Domain model (from Url).
	 * @param dto - The DTO to be converted.
	 * @param defaultPageNumber - Default page number.
	 * @param defaultPageSize - Default page size.
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
			type: type ? TYPE_URL_MAPPING_FROM_DTO[type] : null,
		};
	}
}
