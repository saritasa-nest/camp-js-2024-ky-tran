import { Injectable } from '@angular/core';
import { Pagination } from '@js-camp/core/models/pagination.model';

/** Pagination mapper - map data from domain model to dto and vice versa. */
@Injectable({ providedIn: 'root' })
export class PaginationMapper {
	/**
	 * Map pagination from dto and convert it's results from dto to model.
	 * @param paginationDto Pagination dto.
	 * @param mapperDto Items mapper dto.
	 */
	public fromDto<T, U>(paginationDto: Pagination<T>, mapperDto: (item: T) => U): Pagination<U> {
		return {
			count: paginationDto.count,
			next: paginationDto.next,
			previous: paginationDto.previous,
			results: paginationDto.results.map(mapperDto),
		};
	}
}
