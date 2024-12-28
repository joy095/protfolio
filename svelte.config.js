import adapter from '@sveltejs/adapter-vercel'; // or '@sveltejs/adapter-static' for static sites
import { defineConfig } from 'vite';

export default defineConfig({
	kit: {
		// Other SvelteKit configurations

		// Explicitly use the Vercel adapter if deploying to Vercel
		adapter: adapter({
			// options for the vercel adapter
			// e.g., pages: 'build', assets: 'build'
		})
	}
});
