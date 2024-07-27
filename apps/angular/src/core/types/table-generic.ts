import { AnimeTableColumns } from '@js-camp/angular/core/enums/anime-table-columns';

/** Table generic declares table types, enums and more. */
export type TableGeneric = Readonly<{

	/** Anime table columns. */
	columnKeys: typeof AnimeTableColumns;
}>;
