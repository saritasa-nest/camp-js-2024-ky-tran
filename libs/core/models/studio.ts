import { Immerable, OmitImmerable } from './immerable';

/** Studio. */
export class Studio extends Immerable {

	/** Studio id. */
	public readonly id: number;

	/** Studio name. */
	public readonly name: string;

	/** Studio image source. */
	public readonly imageSrc: string | null;

	public constructor(data: StudioConstructorData) {
		super();
		this.id = data.id;
		this.name = data.name;
		this.imageSrc = data.imageSrc;
	}
}

type StudioConstructorData = OmitImmerable<Studio>;
