import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';
import { BaseQueryParams } from '@js-camp/core/models/base-query-params.model';
import { NonNullableFields } from '@js-camp/core/types/non-nullable-fields';

/**
 * Paginator attribute transform.
 * @param paginator Query params generator.
 */
export function paginatorAttribute(
	paginator: BaseQueryParams.Paginator | null,
): NonNullableFields<BaseQueryParams.Paginator> {
	return {
		pageNumber: paginator?.pageNumber ?? DEFAULT_PAGE_NUMBER,
		pageSize: paginator?.pageSize ?? DEFAULT_PAGE_SIZE,
	};
}
