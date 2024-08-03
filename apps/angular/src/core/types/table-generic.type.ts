import { AnimeTableColumns } from '@js-camp/core/enums/anime-table-columns.enum';

/** Table generic declares table types, enums and more. */
export type TableGeneric = Readonly<{

	/** Anime table columns. */
	columnKeys: typeof AnimeTableColumns;
}>;
