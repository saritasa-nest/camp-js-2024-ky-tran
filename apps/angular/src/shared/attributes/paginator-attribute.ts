import { QueryParamsPaginator } from '@js-camp/core/models/query-params.model';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@js-camp/angular/shared/constants';

/**
 * Paginator attribute transform.
 * @param paginator - Query params generator.
 */
export function paginatorAttribute(paginator: QueryParamsPaginator | null): QueryParamsPaginator {
	return {
		pageNumber: paginator?.pageNumber ?? DEFAULT_PAGE_NUMBER,
		pageSize: paginator?.pageSize ?? DEFAULT_PAGE_SIZE,
	};
}
