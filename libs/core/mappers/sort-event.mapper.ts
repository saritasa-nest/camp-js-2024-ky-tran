import { SortEventDirectionDto, SortEventDto } from '../dtos/sort-event.dto';
import { AnimeQueryParams } from '../models/anime-query-params.model';
import { SortDirection } from '../models/sort-direction.model';

/** Sort event mapper. */
export namespace SortEventMapper {

	/**
	 * Sort event from DTO to domain model.
	 * @param dto DTO.
	 */
	export function fromDto(dto: SortEventDto): AnimeQueryParams.Sort {
		const { active, direction } = dto;

		let sortDirection: SortDirection | null = null;

		if (direction === 'asc') {
			sortDirection = SortDirection.Ascending;
		}
		if (direction === 'desc') {
			sortDirection = SortDirection.Descending;
		}
		if (direction === '') {
			sortDirection = null;
		}

		if (sortDirection === null) {
			return { sortField: null, sortDirection: null };
		}

		return { sortField: active ? active : null, sortDirection };
	}

	/**
	 * Sort from event domain model to DTO.
	 * @param model Domain model.
	 */
	export function toDto(model: AnimeQueryParams.Sort): SortEventDto {
		const { sortField, sortDirection } = model;

		let direction: SortEventDirectionDto = '';

		if (sortDirection === SortDirection.Ascending) {
			direction = 'asc';
		}
		if (sortDirection === SortDirection.Descending) {
			direction = 'desc';
		}
		if (sortDirection === null) {
			direction = '';
		}

		return { active: sortField ? sortField : '', direction };
	}
}
