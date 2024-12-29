export interface Work {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
	image?: string;
}
