import { Injectable } from '@angular/core';

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { AnimeQueryParamsUrlDto } from '@js-camp/core/dtos/anime-query-params-url.dto';
import { AnimeQueryParamsDto } from '@js-camp/core/dtos/anime-query-params.dto';
import { SortEventDto } from '@js-camp/core/dtos/sort-event.dto';
import { QueryParamsMappers } from '@js-camp/core/mappers/query-params.mapper';
import { AnimeQueryParams } from '@js-camp/core/models/anime-query-params.model';

/** Query Params mapper. */
@Injectable({ providedIn: 'root' })
export class QueryParamsMapper {
	/**
	 * Mapping from Domain model to DTO (to Url).
	 * @param model - The Query Params Domain model object to be converted.
	 */
	public toUrlDto(
		model: AnimeQueryParams.Combined | Partial<AnimeQueryParams.Combined>,
	): AnimeQueryParamsUrlDto.Combined {
		const params = QueryParamsMappers.createQueryPramsUrl<AnimeQueryParams.Combined>(model);
		return QueryParamsMappers.toUrlDto(params, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);
	}

	/**
	 * Mapping from DTO to Domain model (from Url).
	 * @param dto - The DTO to be converted.
	 */
	public fromUrlDto(
		dto: AnimeQueryParamsUrlDto.Combined | Partial<AnimeQueryParamsUrlDto.Combined>,
	): AnimeQueryParams.Combined {
		const params = QueryParamsMappers.createQueryPramsUrl<AnimeQueryParamsUrlDto.Combined>(dto);
		return QueryParamsMappers.fromUrlDto(params, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);
	}

	/**
	 * Mapping from Domain model to DTO.
	 * @param model - The Query Params Domain model object to be converted.
	 */
	public toDto(model: AnimeQueryParams.Combined): AnimeQueryParamsDto.Combined {
		return QueryParamsMappers.toDto(model, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);
	}

	/**
	 * Sort from event DTO to Domain model.
	 * @param dto - Sort from event dto.
	 */
	public sortEventFromDto(dto: SortEventDto): AnimeQueryParams.Sort {
		return QueryParamsMappers.sortEventFromDto(dto);
	}

	/**
	 * Sort from event Domain model to DTO.
	 * @param model - Sort from event domain model.
	 */
	public sortEventToDto(model: AnimeQueryParams.Sort): SortEventDto {
		return QueryParamsMappers.sortEventToDto(model);
	}
}
