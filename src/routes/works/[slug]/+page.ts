import type { PageLoad } from './$types.js';
import { getWorkBySlug, getNextWork } from '$lib/sanity.js'; // Replace with your actual data loader
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, url }) => {
    const slug = params.slug;

    const work = await getWorkBySlug(slug);
    if (!work) throw error(404, 'Work not found');

    const nextWork = await getNextWork(slug);

    const fullUrl = `https://joykarmakar.vercel.app/works/${slug}`;

    return {
        work,
        nextWork,
        meta: {
            title: `${work.title} - Joy Karmakar`,
            description: work.description || 'Project showcase by Joy Karmakar',
            image: work.image,
            url: fullUrl,
            twitterHandle: '@JoyKarmakar9871'
        }
    };
};
