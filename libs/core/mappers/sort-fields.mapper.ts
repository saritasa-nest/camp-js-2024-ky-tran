import { SortFields } from '../models/sort-fields.model';
import { SortFieldsDto } from '../dtos/sort-fields.dto';

/** Mapping from DTO to Domain model. */
export const SORT_FIELDS_MAPPING_FROM_DTO: Readonly<Record<SortFieldsDto, SortFields>> = {
	[SortFieldsDto.EnglishTitle]: SortFields.EnglishTitle,
	[SortFieldsDto.AiredStartDate]: SortFields.AiredStartDate,
	[SortFieldsDto.Status]: SortFields.Status,
};

/** Mapping from Domain model to DTO. */
export const SORT_FIELDS_MAPPING_TO_DTO: Readonly<Record<SortFields, SortFieldsDto>> = {
	[SortFields.EnglishTitle]: SortFieldsDto.EnglishTitle,
	[SortFields.AiredStartDate]: SortFieldsDto.AiredStartDate,
	[SortFields.Status]: SortFieldsDto.Status,
};

/** Sort fields mapper. */
export namespace SortFieldsMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param fieldDto DTO.
	 */
	export function fromDto(fieldDto: SortFieldsDto): SortFields {
		return SORT_FIELDS_MAPPING_FROM_DTO[fieldDto];
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param fieldModel Domain model.
	 */
	export function toDto(fieldModel: SortFields): SortFieldsDto {
		return SORT_FIELDS_MAPPING_TO_DTO[fieldModel];
	}
}
