/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		// agregamos los colores de spotify a a tailwind
		extend: {
			colors: {
				// agregamos el color de los items #121212
				'base-color': '#121212',
				//agregamos el color de fondo #000000
				'base-bg': '#000000',
				//agregamos color por defecto de los textos e iconos
				'text-color': '#b3b3b3',
				//agregamos el color del hover de textos e iconos (blanco)
				'text-color-hover': '#ffffff',
				'items-color-hover': '#1A1A1A',
				'items-color-active': '#232323',
				'spotify-green': '#1FDF64',
			},
		},
	},
	plugins: [],
}
