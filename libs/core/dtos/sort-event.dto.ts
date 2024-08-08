import { SortFields } from '../models/sort-fields.model';

export type SortEventFieldsDto = SortFields.EnglishTitle | SortFields.AiredStartDate | SortFields.Status | '';

export type SortEventDirectionDto = 'asc' | 'desc' | '';

/** Sort from event. */
export type SortEventDto = Readonly<{

	/** The sort field being sorted. */
	active: SortEventFieldsDto;

	/** Sort direction. */
	direction: SortEventDirectionDto;
}>;
