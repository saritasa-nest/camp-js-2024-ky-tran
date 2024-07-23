import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime.model';

/** Paginated Anime Dto. */
export type PaginatedAnimeDto = PaginationDto<AnimeDto>;

/** Paginated Anime. */
export type PaginatedAnime = PaginationDto<Anime>;
