import { Injectable } from '@angular/core';

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { QueryParamsDto, QueryParamsUrlDto } from '@js-camp/core/dtos/query-params.dto';
import { QueryParamsMappers } from '@js-camp/core/mappers/query-params.mapper';
import { QueryParams } from '@js-camp/core/models/query-params.model';

/** Query Params mapper. */
@Injectable({ providedIn: 'root' })
export class QueryParamsMapper {
	/**
	 * Create query params with the provided query params and all left query params with the default value null.
	 * @param params - The provided query params.
	 */
	public createDefault(params: Partial<QueryParams>): QueryParams {
		return QueryParamsMappers.createDefault(params);
	}

	/**
	 * Mapping from Domain model to DTO (to Url).
	 * @param model - The Query Params Domain model object to be converted.
	 */
	public toUrlDto(model: QueryParams): QueryParamsUrlDto {
		return QueryParamsMappers.toUrlDto(model, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);
	}

	/**
	 * Mapping from DTO to Domain model (from Url).
	 * @param dto - The DTO to be converted.
	 */
	public fromUrlDto(dto: QueryParamsUrlDto): QueryParams {
		return QueryParamsMappers.fromUrlDto(dto, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);
	}

	/**
	 * Mapping from Domain model to DTO.
	 * @param model - The Query Params Domain model object to be converted.
	 */
	public toDto(model: QueryParams): QueryParamsDto {
		return QueryParamsMappers.toDto(model, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);
	}
}
