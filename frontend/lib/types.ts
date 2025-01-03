export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  category: string;
  description?: string;
}

export interface ProductDetails {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    images: string[];
    rating: number;
    reviews: number;
    description?: string;
    sizes: string[];
    category: Category;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount?: number;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
} 