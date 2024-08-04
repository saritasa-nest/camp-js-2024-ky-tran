import { SortFields } from '../models/sort-fields.model';

/** Sort from event. */
export type SortEventDto = Readonly<{

	/** The sort field being sorted. */
	active: SortFields;

	/** Sort direction. */
	direction: SortEventDirectionDto;
}>;

export type SortEventDirectionDto = 'asc' | 'desc' | '';
