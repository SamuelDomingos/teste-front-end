import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const baseUrl = env.VITE_API_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      'VITE_API_BASE_URL ausente: copie .env.example para .env e preencha a base da API.',
    );
  }

  // A API do teste não envia cabeçalhos CORS, então o JSON é acessado via
  // proxy local em desenvolvimento/preview. Ver src/services/products.ts.
  const api = new URL(baseUrl);
  const apiPath = api.pathname.replace(/\/+$/, '') || '/';

  const API_PROXY = {
    '/api': {
      target: api.origin,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, apiPath),
    },
  };

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      open: false,
      proxy: API_PROXY,
    },
    preview: {
      port: 4173,
      proxy: API_PROXY,
    },
  };
});
