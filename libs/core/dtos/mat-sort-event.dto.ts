import { SortFields } from '../models/sort-fields';

export type MatSortEventFieldsDto = SortFields.EnglishTitle | SortFields.AiredStartDate | SortFields.Status | '';

export type MatSortEventDirectionDto = 'asc' | 'desc' | '';

/** Mat sort event DTO. */
export type MatSortEventDto = Readonly<{

	/** The sort field being sorted. */
	active: MatSortEventFieldsDto;

	/** Sort direction. */
	direction: MatSortEventDirectionDto;
}>;
