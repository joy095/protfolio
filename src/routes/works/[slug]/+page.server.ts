// src/routes/works/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity';

export const load: PageServerLoad = async ({ params }: { params: { slug: string } }) => {
	try {
		const query = `*[_type == "work" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      image,
      image_2,
      image_3,
      image_4,
      image_5,
      description,
      type,
	  link,
    }`;

		const work = await client.fetch(query, { slug: params.slug });

		if (!work) {
			throw error(404, 'Work not found');
		}

		return {
			work
		};
	} catch (err) {
		console.error('Error loading work:', err);

		if (err instanceof Error && 'status' in err) {
			throw err;
		}

		throw error(500, 'Error loading work');
	}
};
