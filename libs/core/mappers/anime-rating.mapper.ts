import { AnimeRatingDto } from '../dtos/anime-rating-dto';
import { AnimeRating } from '../models/anime-rating';

const ANIME_RATING_MAP_FROM_DTO: Readonly<Record<AnimeRatingDto, AnimeRating>> = {
	[AnimeRatingDto.AllAges]: AnimeRating.AllAges,
	[AnimeRatingDto.Children]: AnimeRating.Children,
	[AnimeRatingDto.Teens]: AnimeRating.Teens,
	[AnimeRatingDto.Violence]: AnimeRating.Violence,
	[AnimeRatingDto.MildNudity]: AnimeRating.MildNudity,
	[AnimeRatingDto.Hentai]: AnimeRating.Hentai,
	[AnimeRatingDto.Unknown]: AnimeRating.Unknown,
};

export namespace AnimeRatingMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeRatingDto): AnimeRating {
		return ANIME_RATING_MAP_FROM_DTO[dto];
	}
}
