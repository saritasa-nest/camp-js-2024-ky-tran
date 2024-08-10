import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AnimeQueryParamsDto } from '@js-camp/core/dtos/anime-query-params.dto';

/** Url Service. */
@Injectable({ providedIn: 'root' })
export class UrlService {
	/**
	 * Remove all null fields in an object.
	 * @param obj Object.
	 */
	protected removeNullFields<O extends { [key: string]: unknown; }>(obj: O): Partial<O> {
		return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null)) as Partial<O>;
	}

	/**
	 * Create Http query params.
	 * @param paramsDto Query params DTO.
	 */
	protected createHttpQueryParams(paramsDto: AnimeQueryParamsDto.Combined): HttpParams {
		return Object.entries(paramsDto).reduce((httpPrams, [key, value]) =>
			value != null ? httpPrams.set(key, value.toString()) : httpPrams
		, new HttpParams());
	}
}
