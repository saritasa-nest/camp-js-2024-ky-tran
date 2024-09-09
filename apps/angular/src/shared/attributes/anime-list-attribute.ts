import { AnimeOverview } from '@js-camp/core/models/anime-overview';

/**
 * Anime list attribute transform.
 * @param animeList List of anime.
 */
export function animeListAttribute(animeList: readonly AnimeOverview[] | null): readonly AnimeOverview[] {
	return animeList ?? [];
}
