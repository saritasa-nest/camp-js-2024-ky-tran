import { Pagination } from '../models/pagination.model';

/** Pagination mapper. */
export namespace PaginationMapper {

	/**
	 * Map pagination from dto to domain model.
	 * @param paginationDto Pagination DTO.
	 * @param mapperDto Items DTO mapper.
	 */
	export function fromDto<T, U>(paginationDto: Pagination<T>, mapperDto: (item: T) => U): Pagination<U> {
		return {
			count: paginationDto.count,
			next: paginationDto.next,
			previous: paginationDto.previous,
			results: paginationDto.results.map(mapperDto),
		};
	}
}
