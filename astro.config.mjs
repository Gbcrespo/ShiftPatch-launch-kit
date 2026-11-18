// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Emit privacy.html (not privacy/index.html) so Cloudflare Pages serves
	// /privacy directly instead of redirecting to /privacy/.
	build: { format: 'file' },
});
