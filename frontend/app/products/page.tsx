import { api } from '@/lib/api';
import ProductList from '@/components/ui/ProductList';
import { SearchFilters } from '@/lib/types';
import Header from '@/components/layout/Header';
import { Metadata } from 'next';

interface SearchPageProps {
  searchParams: {
    query?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  };
}

export const metadata: Metadata = {
  title: 'All Products | DigiProd',
  description: 'Browse our collection of products',
};

export default async function ProductsPage({ searchParams }: SearchPageProps) {
  const filters: SearchFilters = {
    query: searchParams.query,
    category: searchParams.category,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    sort: searchParams.sort as SearchFilters['sort'],
  };

  const products = await api.searchProducts(filters);

  return (
    <>
      <Header />
      <ProductList 
        products={products} 
        totalCount={products.length} 
        title={searchParams.query ? `Search results for "${searchParams.query}"` : 'All Products'} 
      />
    </>
  );
} 