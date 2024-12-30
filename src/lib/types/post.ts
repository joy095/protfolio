export interface Work {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
	image: SanityImage;
	description: string;
	type: string;
}

export interface SanityImage {
	_type: 'image';
	asset: {
		_ref: string;
		_type: 'reference';
	};
}
