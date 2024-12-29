import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';

export const client: SanityClient = createClient({
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
	dataset: import.meta.env.VITE_SANITY_DATABASE,
	apiVersion: import.meta.env.VITE_SANITY_VERSION,
	useCdn: true
});
