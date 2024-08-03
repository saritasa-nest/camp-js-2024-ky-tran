import { SortFieldsDto } from '../dtos/sort-fields.dto';
import { SortFields } from '../models/sort-fields.model';

/** Mapping from Domain model to DTO. */
export const SORT_FIELDS_MAPPING_TO_DTO: Readonly<Record<SortFields, SortFieldsDto>> = {
	[SortFields.EnglishTitle]: SortFieldsDto.EnglishTitle,
	[SortFields.AiredStartDate]: SortFieldsDto.AiredStartDate,
	[SortFields.Status]: SortFieldsDto.Status,
};
