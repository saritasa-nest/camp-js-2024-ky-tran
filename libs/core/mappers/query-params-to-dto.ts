import { QueryParamsDto, QueryParamsDtoBluePrint } from '../dtos/query-params';
import { QueryParams } from '../models/query-params';
import { TYPE_MAPPING_TO_DTO } from '../records/type-mapping';

/**
 * Mapping from Domain model to DTO.
 * @param queryParams - The Query Params Domain model object to be converted.
 * @returns The converted object - DTO.
 */
export function queryParamsToDto(queryParams: QueryParams): QueryParamsDto {
	return new QueryParamsDtoBluePrint({
		offset: queryParams.pageNumber,
		limit: queryParams.pageSize,
		ordering: queryParams.sortFields,
		type: queryParams.type && TYPE_MAPPING_TO_DTO[queryParams.type],
		search: queryParams.search,
	});
}
