import { SortEventDirectionDto, SortEventDto } from '../dtos/sort-event.dto';
import { AnimeFilterParams } from '../models/anime-filter-params';
import { SortDirection } from '../models/sort-direction';

/** Sort event mapper. */
export namespace SortEventMapper {

	/**
	 * Sort event from DTO to domain model.
	 * @param dto DTO.
	 */
	export function fromDto(dto: SortEventDto): AnimeFilterParams.Sort {
		let sortDirection: SortDirection | null = null;

		if (dto.direction === 'asc') {
			sortDirection = SortDirection.Ascending;
		}
		if (dto.direction === 'desc') {
			sortDirection = SortDirection.Descending;
		}

		return {
			sortField: sortDirection !== null && dto.active ? dto.active : null,
			sortDirection,
		};
	}

	/**
	 * Sort from event domain model to DTO.
	 * @param model Domain model.
	 */
	export function toDto(model: AnimeFilterParams.Sort): SortEventDto {
		let direction: SortEventDirectionDto = '';

		if (model.sortDirection === SortDirection.Ascending) {
			direction = 'asc';
		}
		if (model.sortDirection === SortDirection.Descending) {
			direction = 'desc';
		}

		return { active: model.sortField ?? '', direction };
	}
}
