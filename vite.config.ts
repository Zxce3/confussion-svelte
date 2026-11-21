import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit({
			adapter: adapter(),
			paths: { base: (process.env.BASE_PATH ?? '') as '' | `/${string}` }
		})]
});
