import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client: SanityClient = createClient({
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
	dataset: import.meta.env.VITE_SANITY_DATABASE,
	apiVersion: import.meta.env.VITE_SANITY_VERSION,
	useCdn: true
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage): string {
	return builder.image(source).url();
}
