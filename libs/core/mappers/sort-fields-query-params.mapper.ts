import { SortFieldsQueryParamsDto } from '../dtos/sort-fields-query-params.dto';
import { SortFields } from '../models/sort-fields';

/** Mapping from DTO to Domain model. */
const SORT_FIELDS_QUERY_PARAMS_MAPPING_FROM_DTO: Readonly<Record<SortFieldsQueryParamsDto, SortFields>> = {
	[SortFieldsQueryParamsDto.EnglishTitle]: SortFields.EnglishTitle,
	[SortFieldsQueryParamsDto.AiredStartDate]: SortFields.AiredStartDate,
	[SortFieldsQueryParamsDto.Status]: SortFields.Status,
};

/** Mapping from Domain model to DTO. */
const SORT_FIELDS_QUERY_PARAMS_MAPPING_TO_DTO: Readonly<Record<SortFields, SortFieldsQueryParamsDto>> = {
	[SortFields.EnglishTitle]: SortFieldsQueryParamsDto.EnglishTitle,
	[SortFields.AiredStartDate]: SortFieldsQueryParamsDto.AiredStartDate,
	[SortFields.Status]: SortFieldsQueryParamsDto.Status,
};

/** Sort fields url mapper. */
export namespace SortFieldsUrlMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param fieldDto DTO.
	 */
	export function fromDto(fieldDto: SortFieldsQueryParamsDto): SortFields {
		return SORT_FIELDS_QUERY_PARAMS_MAPPING_FROM_DTO[fieldDto];
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param fieldModel Domain model.
	 */
	export function toDto(fieldModel: SortFields): SortFieldsQueryParamsDto {
		return SORT_FIELDS_QUERY_PARAMS_MAPPING_TO_DTO[fieldModel];
	}
}
