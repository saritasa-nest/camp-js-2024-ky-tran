import { Immerable, OmitImmerable } from './immerable';

/** Studio. */
export class Studio extends Immerable {

	/** Studio id. */
	public readonly id: number;

	/** Studio name. */
	public readonly name: string;

	/** Studio image url. */
	public readonly imageUrl: string;

	public constructor(data: StudioConstructorData) {
		super();
		this.id = data.id;
		this.name = data.name;
		this.imageUrl = data.imageUrl;
	}
}

type StudioConstructorData = OmitImmerable<Studio>;
