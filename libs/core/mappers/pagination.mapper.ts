import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

/** Pagination mapper. */
export namespace PaginationMapper {

	/**
	 * Map pagination from DTO to domain model.
	 * @param paginationDto Pagination DTO.
	 * @param mapperDto Items DTO mapper.
	 */
	export function fromDto<T, U>(paginationDto: PaginationDto<T>, mapperDto: (item: T) => U): Pagination<U> {
		return {
			count: paginationDto.count,
			next: paginationDto.next,
			previous: paginationDto.previous,
			results: paginationDto.results.map(mapperDto),
		};
	}
}
