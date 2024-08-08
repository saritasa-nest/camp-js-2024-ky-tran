import { SortFieldsUrlDto } from '../dtos/sort-fields-url.dto';
import { SortFieldsDto } from '../dtos/sort-fields.dto';
import { SortFields } from '../models/sort-fields.model';

/** Mapping from Domain model to DTO. */
export const SORT_FIELDS_MAPPING_TO_DTO: Readonly<Record<SortFields, SortFieldsDto>> = {
	[SortFields.EnglishTitle]: SortFieldsDto.EnglishTitle,
	[SortFields.AiredStartDate]: SortFieldsDto.AiredStartDate,
	[SortFields.Status]: SortFieldsDto.Status,
};

/** Mapping from Domain model to DTO. */
export const SORT_FIELDS_URL_MAPPING_TO_DTO: Readonly<Record<SortFields, SortFieldsUrlDto>> = {
	[SortFields.EnglishTitle]: SortFieldsUrlDto.EnglishTitle,
	[SortFields.AiredStartDate]: SortFieldsUrlDto.AiredStartDate,
	[SortFields.Status]: SortFieldsUrlDto.Status,
};

/** Mapping from DTO to Domain model. */
export const SORT_FIELDS_MAPPING_FROM_DTO: Readonly<Record<SortFieldsDto, SortFields>> = {
	[SortFieldsDto.EnglishTitle]: SortFields.EnglishTitle,
	[SortFieldsDto.AiredStartDate]: SortFields.AiredStartDate,
	[SortFieldsDto.Status]: SortFields.Status,
};

/** Mapping from DTO to Domain model. */
export const SORT_FIELDS_URL_MAPPING_FROM_DTO: Readonly<Record<SortFieldsUrlDto, SortFields>> = {
	[SortFieldsUrlDto.EnglishTitle]: SortFields.EnglishTitle,
	[SortFieldsUrlDto.AiredStartDate]: SortFields.AiredStartDate,
	[SortFieldsUrlDto.Status]: SortFields.Status,
};
