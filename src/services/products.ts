import type { Product, ProductResponse } from '@/types/product';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

const PROXY_URL = '/api/lista-produtos/produtos.json';

const DIRECT_URL = BASE_URL ? `${BASE_URL}/lista-produtos/produtos.json` : null;

async function getProducts(url: string, signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Não foi possível carregar os produtos (status ${response.status}).`);
  }

  const data = (await response.json()) as ProductResponse;

  if (!data.success || !Array.isArray(data.products)) {
    throw new Error('A resposta da API de produtos é inválida.');
  }

  return data.products;
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  try {
    return await getProducts(PROXY_URL, signal);
  } catch (proxyError) {
    if (signal?.aborted) throw proxyError;
    if (DIRECT_URL) return await getProducts(DIRECT_URL, signal);
    throw new Error(
      'VITE_API_BASE_URL não configurada: copie .env.example para .env antes de rodar.',
    );
  }
}
