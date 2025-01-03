import { Product, Category, SearchFilters, ProductDetails } from './types';

const API_BASE_URL = 'http://localhost:5420/api';

export const api = {
  // Products
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/products/featured`, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  },

  async getTrendingProducts(): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/products/trending`, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error('Error fetching trending products:', error);
      return [];
    }
  },

  async searchProducts(params: SearchFilters): Promise<Product[]> {
    try {
      const searchParams = new URLSearchParams();
      if (params.query) searchParams.append('query', params.query);
      if (params.category) searchParams.append('category', params.category);
      if (params.minPrice) searchParams.append('minPrice', params.minPrice.toString());
      if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
      if (params.sort) searchParams.append('sort', params.sort);

      const res = await fetch(`${API_BASE_URL}/products/search?${searchParams}`, {
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },

  async getProductById(id: string): Promise<ProductDetails | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  async getSimilarProducts(categoryId: string): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/products/similar/${categoryId}`, {
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch similar products');
      }

      return res.json();
    } catch (error) {
      console.error('Error fetching similar products:', error);
      return [];
    }
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  async getCategoryById(id: string): Promise<Category | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }
};