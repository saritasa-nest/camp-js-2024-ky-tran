import { AnimeStatus, AnimeStatusDto } from '@js-camp/angular/core/enums/anime-status';

/** Map AnimeStatusDto to AnimeStatus. */
export const statusMappingFromDto: Record<AnimeStatusDto, AnimeStatus> = {
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};
