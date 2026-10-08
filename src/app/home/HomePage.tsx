import { useState } from 'react';
import { Header } from '@/components/layout/Header/Header';
import { Hero } from './sections/Hero/Hero';
import { CategoryGrid } from './sections/CategoryGrid/CategoryGrid';
import { ProductShelf } from './sections/ProductShelf/ProductShelf';
import { BannerPair } from './sections/BannerPair/BannerPair';
import { BrandCarousel } from './sections/BrandCarousel/BrandCarousel';
import { Newsletter } from '@/components/layout/Newsletter/Newsletter';
import { Footer } from '@/components/layout/Footer/Footer';
import { ProductModal } from './sections/ProductModal/ProductModal';
import { useProducts } from './hooks/useProducts';
import type { Product } from '@/types/product';

const SHELF_TAGS = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs', 'Ver todos'];

const BANNERS_TOP = [
  {
    title: 'Parceiros',
    text: 'Conheça as marcas parceiras e garanta ofertas exclusivas.',
    variant: 'a' as const,
  },
  {
    title: 'Parceiros',
    text: 'Novidades e promoções imperdíveis todas as semanas.',
    variant: 'b' as const,
  },
];

const BANNERS_BOTTOM = [
  {
    title: 'Parceiros',
    text: 'Cupons e descontos para renovar a sua casa.',
    variant: 'c' as const,
  },
  {
    title: 'Parceiros',
    text: 'As melhores condições de pagamento do mercado.',
    variant: 'd' as const,
  },
];

export default function HomePage() {
  const { products, status, error, reload } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <CategoryGrid />

        <ProductShelf
          id="vitrine"
          title="Produtos relacionados"
          tags={SHELF_TAGS}
          products={products}
          status={status}
          error={error}
          onRetry={reload}
          onSelect={setSelectedProduct}
        />

        <BannerPair items={BANNERS_TOP} />

        <ProductShelf
          title="Produtos relacionados"
          products={products}
          status={status}
          error={error}
          onRetry={reload}
          onSelect={setSelectedProduct}
        />

        <BannerPair items={BANNERS_BOTTOM} />

        <BrandCarousel />

        <ProductShelf
          title="Produtos relacionados"
          products={products}
          status={status}
          error={error}
          onRetry={reload}
          onSelect={setSelectedProduct}
        />
      </main>

      <Newsletter />
      <Footer />

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
