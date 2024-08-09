import { SortFieldsUrlDto } from '../dtos/sort-fields-url.dto';
import { SortFields } from '../models/sort-fields';

// TODO (Ky Tran): Update Url to Query param

/** Mapping from DTO to Domain model. */
export const SORT_FIELDS_URL_MAPPING_FROM_DTO: Readonly<Record<SortFieldsUrlDto, SortFields>> = {
	[SortFieldsUrlDto.EnglishTitle]: SortFields.EnglishTitle,
	[SortFieldsUrlDto.AiredStartDate]: SortFields.AiredStartDate,
	[SortFieldsUrlDto.Status]: SortFields.Status,
};

/** Mapping from Domain model to DTO. */
export const SORT_FIELDS_URL_MAPPING_TO_DTO: Readonly<Record<SortFields, SortFieldsUrlDto>> = {
	[SortFields.EnglishTitle]: SortFieldsUrlDto.EnglishTitle,
	[SortFields.AiredStartDate]: SortFieldsUrlDto.AiredStartDate,
	[SortFields.Status]: SortFieldsUrlDto.Status,
};

/** Sort fields url mapper. */
export namespace SortFieldsUrlMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param fieldDto DTO.
	 */
	export function fromDto(fieldDto: SortFieldsUrlDto): SortFields {
		return SORT_FIELDS_URL_MAPPING_FROM_DTO[fieldDto];
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param fieldModel Domain model.
	 */
	export function toDto(fieldModel: SortFields): SortFieldsUrlDto {
		return SORT_FIELDS_URL_MAPPING_TO_DTO[fieldModel];
	}
}
