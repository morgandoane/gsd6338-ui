import { nextui } from '@nextui-org/react';
import tsconfigPaths from 'vite-tsconfig-paths';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {},
	darkMode: 'class',
	plugins: [nextui(), tsconfigPaths()],
};
