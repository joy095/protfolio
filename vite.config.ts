import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	preview: {
		host: '0.0.0.0', // Make the app accessible on all network interfaces
		port: 4000 // Change this to any port you'd like for production preview
	},
	server: {
		proxy: {
			'/api': {
				target: 'https://nodemailer-bay.vercel.app',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
});
