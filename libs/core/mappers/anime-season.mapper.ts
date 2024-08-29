import { AnimeSeasonDto } from '../dtos/anime-season.dto';
import { AnimeSeason } from '../models/anime-season';

const ANIME_SEASON_MAP_FROM_DTO: Readonly<Record<AnimeSeasonDto, AnimeSeason>> = {
	[AnimeSeasonDto.Summer]: AnimeSeason.Summer,
	[AnimeSeasonDto.Winter]: AnimeSeason.Winter,
	[AnimeSeasonDto.Spring]: AnimeSeason.Spring,
	[AnimeSeasonDto.Fall]: AnimeSeason.Fall,
	[AnimeSeasonDto.NonSeasonal]: AnimeSeason.NonSeasonal,
};

export namespace AnimeSeasonMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Anime DTO.
	 */
	export function fromDto(dto: AnimeSeasonDto): AnimeSeason {
		return ANIME_SEASON_MAP_FROM_DTO[dto];
	}
}
