import { SortFieldsQueryParams } from '../enums/sort-fields-query-params';
import { SortFields } from '../models/sort-fields';

/** Mapping from DTO to Domain model. */
const SORT_FIELDS_QUERY_PARAMS_MAPPING_FROM_DTO: Readonly<Record<SortFieldsQueryParams, SortFields>> = {
	[SortFieldsQueryParams.EnglishTitle]: SortFields.EnglishTitle,
	[SortFieldsQueryParams.AiredStartDate]: SortFields.AiredStartDate,
	[SortFieldsQueryParams.Status]: SortFields.Status,
};

/** Mapping from Domain model to DTO. */
const SORT_FIELDS_QUERY_PARAMS_MAPPING_TO_DTO: Readonly<Record<SortFields, SortFieldsQueryParams>> = {
	[SortFields.EnglishTitle]: SortFieldsQueryParams.EnglishTitle,
	[SortFields.AiredStartDate]: SortFieldsQueryParams.AiredStartDate,
	[SortFields.Status]: SortFieldsQueryParams.Status,
};

/** Sort fields url mapper. */
export namespace SortFieldsUrlMapper {

	/**
	 * Mapping from DTO to domain model.
	 * @param fieldDto DTO.
	 */
	export function fromDto(fieldDto: SortFieldsQueryParams): SortFields {
		return SORT_FIELDS_QUERY_PARAMS_MAPPING_FROM_DTO[fieldDto];
	}

	/**
	 * Mapping from domain model to DTO.
	 * @param fieldModel Domain model.
	 */
	export function toDto(fieldModel: SortFields): SortFieldsQueryParams {
		return SORT_FIELDS_QUERY_PARAMS_MAPPING_TO_DTO[fieldModel];
	}
}
