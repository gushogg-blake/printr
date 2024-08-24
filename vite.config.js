import {resolve} from "path";
import {defineConfig} from "vite";
import {svelte} from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	
	resolve: {
		alias: {
			"$src": resolve(__dirname, "src"),
			"$css": resolve(__dirname, "src/css"),
			"$lib": resolve(__dirname, "src/lib"),
			"$utils": resolve(__dirname, "src/utils"),
			"$modules": resolve(__dirname, "src/modules"),
			"$assets": resolve(__dirname, "src/assets"),
			"$components": resolve(__dirname, "src/components"),
			"$stores": resolve(__dirname, "src/stores"),
		},
	},
});
