import { Injectable } from '@angular/core';

import { Pagination, PaginationBluePrint } from '../models/pagination';

/** PaginationMapper. */
@Injectable({
	providedIn: 'root',
})
export class PaginationMapper {
	/**
	 * Map Pagination From Dto and convert it's results from dto to model.
	 * @param paginationDto Pagination dto.
	 * @param mapperDto Items mapper dto.
	 * @returns New instance of Pagination model.
	 */
	public mapPaginationFromDto<T, U>(
		paginationDto: Pagination<T>,
		mapperDto: (item: T) => U,
	): PaginationBluePrint<U> {
		return new PaginationBluePrint<U>({
			count: paginationDto.count,
			next: paginationDto.next,
			previous: paginationDto.previous,
			results: paginationDto.results.map(mapperDto),
		});
	}
}
