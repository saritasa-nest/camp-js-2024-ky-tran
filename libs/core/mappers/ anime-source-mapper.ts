import { AnimeSourceDto } from '../dtos/anime-source-dto';
import { AnimeSource } from '../models/anime-source';

const ANIME_SOURCE_MAP_FROM_DTO: Readonly<Record<AnimeSourceDto, AnimeSource>> = {
	[AnimeSourceDto.FourKomaManga]: AnimeSource.FourKomaManga,
	[AnimeSourceDto.Book]: AnimeSource.Book,
	[AnimeSourceDto.CardGame]: AnimeSource.CardGame,
	[AnimeSourceDto.Game]: AnimeSource.Game,
	[AnimeSourceDto.LightNovel]: AnimeSource.LightNovel,
	[AnimeSourceDto.Manga]: AnimeSource.Manga,
	[AnimeSourceDto.MixedMedia]: AnimeSource.MixedMedia,
	[AnimeSourceDto.Music]: AnimeSource.Music,
	[AnimeSourceDto.Novel]: AnimeSource.Novel,
	[AnimeSourceDto.Original]: AnimeSource.Original,
	[AnimeSourceDto.PictureBook]: AnimeSource.PictureBook,
	[AnimeSourceDto.Radio]: AnimeSource.Radio,
	[AnimeSourceDto.VisualNovel]: AnimeSource.VisualNovel,
	[AnimeSourceDto.WebManga]: AnimeSource.WebManga,
	[AnimeSourceDto.WebNovel]: AnimeSource.WebNovel,
	[AnimeSourceDto.Other]: AnimeSource.Other,
	[AnimeSourceDto.Unknown]: AnimeSource.Unknown,
};

export namespace AnimeSourceMapper {

	/**
	 * Maps DTO to domain model.
	 * @param dto Anime DTO.
	 */
	export function fromDto(dto: AnimeSourceDto): AnimeSource {
		return ANIME_SOURCE_MAP_FROM_DTO[dto];
	}
}
