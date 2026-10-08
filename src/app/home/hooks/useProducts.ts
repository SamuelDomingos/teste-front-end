import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '@/services/products';
import type { Product } from '@/types/product';

type Status = 'loading' | 'success' | 'error';

interface UseProductsResult {
  products: Product[];
  status: Status;
  error: string | null;
  reload: () => void;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const reload = useCallback(() => setReloadToken((token) => token + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    setError(null);

    fetchProducts(controller.signal)
      .then((data) => {
        setProducts(data);
        setStatus('success');
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setProducts([]);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Erro inesperado ao carregar produtos.');
      });

    return () => controller.abort();
  }, [reloadToken]);

  return { products, status, error, reload };
}
