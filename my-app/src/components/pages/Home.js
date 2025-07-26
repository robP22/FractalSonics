import React, { useCallback } from "react";
import { PageLayout } from '../layout';
import { ProductGrid } from '../product';
import { useProducts } from '../../hooks/useProducts';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { usePurchaseHistory } from '../../hooks/usePurchaseHistory';
import '../../styles/Home.css';

function getTopProductIds(purchaseHistory, topN) {
  const counts = {};
  purchaseHistory.forEach(ph => {
    counts[ph.product_id] = (counts[ph.product_id] || 0) + Number(ph.quantity);
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([id]) => id);
}

export default function Home() {
  const { error, handleError, clearError } = useErrorHandler();

  const onError = useCallback((err) => {
    handleError('Failed to load featured products. Make sure Flask backend is running on port 5000.', err);
  }, [handleError]);

  // Get trending products (random selection from all products)
  const { products: allProducts, loading: trendingLoading } = useProducts(
    false,
    0,
    onError
  );

  const { purchaseHistory } = usePurchaseHistory();
  // After loading products and purchaseHistory
  const trendingProductIds = purchaseHistory && purchaseHistory.length > 0
    ? getTopProductIds(purchaseHistory, 5).map(String)
    : allProducts.slice(0, 5).map(p => String(p.id));

  const topTrendingProducts = allProducts
    .filter(product => trendingProductIds.includes(String(product.id)))
    .map(product => ({
      ...product,
      trending: purchaseHistory && purchaseHistory.length > 0
        ? trendingProductIds.includes(String(product.id))
        : false
    }));

  // Debug logging (remove in production)
  // console.log('allProducts:', allProducts);
  // console.log('purchaseHistory:', purchaseHistory);

  return (
    <PageLayout
      className="home-page"
      error={error}
      onErrorClose={clearError}
      loading={trendingLoading || !purchaseHistory}
      loadingMessage="Loading products..."
    >
      <section className="products-section">
        <ProductGrid
          products={topTrendingProducts}
          className="home-products-grid"
          emptyMessage="No trending products available"
        />
      </section>
    </PageLayout>
  );
}