import { DateRangeDto } from '../dtos/date-range.dto';
import { DateRange } from '../models/date-range';

/** Date range mapper. */
export namespace DateRangeMapper {

	/**
	 * Parsing data from DTO.
	 * @param dateDto DTO.
	 */
	export function parseDateFromDto(dateDto: string): Date {
		const date = new Date(dateDto);

		if (isNaN(date.getTime())) {
			throw new Error(`Invalid date format: ${dateDto}`);
		}

		return date;
	}

	/**
	 * Parsing data to DTO.
	 * @param dateModel Domain model.
	 */
	export function parseDateToDto(dateModel: Date): string {
		return dateModel.toISOString();
	}

	/**
	 * Mapping from dto to domain model.
	 * @param dateRangeDto DTO.
	 */
	export function fromDto(dateRangeDto: DateRangeDto): DateRange {
		return {
			startAt: dateRangeDto.start ? parseDateFromDto(dateRangeDto.start) : null,
			endAt: dateRangeDto.end ? parseDateFromDto(dateRangeDto.end) : null,
		};
	}

	/**
	 * Mapping from domain model to dto.
	 * @param dateRangeModel Domain model.
	 */
	export function toDto(dateRangeModel: DateRange): DateRangeDto {
		return {
			start: dateRangeModel.startAt ? parseDateToDto(dateRangeModel.startAt) : null,
			end: dateRangeModel.endAt ? parseDateToDto(dateRangeModel.endAt) : null,
		};
	}
}
