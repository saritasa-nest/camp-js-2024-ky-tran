import { Injectable } from '@angular/core';

import { QueryParamsDto } from '@js-camp/core/dtos/query-params';
import { QueryParamsMappers } from '@js-camp/core/mappers/query-params-to-dto';
import { QueryParams } from '@js-camp/core/models/query-params';

/** Query Params mapper. */
@Injectable({ providedIn: 'root' })
export class QueryParamsMapper {
	/**
	 * Mapping from DTO to Domain model.
	 * @param queryParams - The query params object to be converted.
	 * @returns The converted object.
	 */
	public toDto(queryParams: QueryParams): QueryParamsDto {
		return QueryParamsMappers.queryParamsToDto(queryParams);
	}
}
