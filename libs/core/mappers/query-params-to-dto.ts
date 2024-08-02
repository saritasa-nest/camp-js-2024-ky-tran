import { QueryParamsDto } from '../dtos/query-params';
import { QueryParams } from '../models/query-params';
import { TYPE_MAPPING_TO_DTO } from '../records/type-mapping';

/** Query Params mapper namespace. */
export namespace QueryParamsMappers {

	/**
	 * Mapping from Domain model to DTO.
	 * @param queryParams - The Query Params Domain model object to be converted.
	 * @returns The converted object - DTO.
	 */
	export function queryParamsToDto(queryParams: QueryParams): QueryParamsDto {
		const { pageNumber, pageSize, sortFields, type, search } = queryParams;

		return {
			offset: (pageNumber && pageSize) ? (pageNumber - 1) * pageSize : null,
			limit: pageSize,
			ordering: sortFields?.length ? sortFields.join(',') : null,
			type: type && TYPE_MAPPING_TO_DTO[type],
			search,
		};
	}
}
