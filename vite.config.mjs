import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), 'API_URL');

	return {
		publicDir: false,
		plugins: [
			react(),
			svgr({
				svgrOptions: { exportType: 'named', namedExport: 'ReactComponent' },
			}),
		],
		define: {
			'process.env.API_URL': JSON.stringify(env.API_URL) || 'undefined',
		},
		build: {
			outDir: 'dist-vite',
		},
	};
});
