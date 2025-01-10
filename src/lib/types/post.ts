export interface Work {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
	image: SanityImage;
	image2: SanityImage;
	image3: SanityImage;
	image4: SanityImage;
	image5: SanityImage;
	description: string;
}

export interface SanityImage {
	_type: 'image';
	asset: {
		_ref: string;
		_type: 'reference';
	};
}

export interface NextWork {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
	image: SanityImage;
	description: string;
}
