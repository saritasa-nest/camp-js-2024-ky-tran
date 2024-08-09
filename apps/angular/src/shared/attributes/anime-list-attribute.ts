import { Anime } from '@js-camp/core/models/anime.model';

/**
 * Anime list attribute transform.
 * @param animeList List of anime.
 */
export function animeListAttribute(animeList: readonly Anime[] | null): readonly Anime[] {
	return animeList ? animeList : [] as readonly Anime[];
}
