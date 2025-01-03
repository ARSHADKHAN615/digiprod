'use client';

import { Product, Category } from '@/lib/types';
import ProductCard from './ProductCard';
import RangeSlider from './RangeSlider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { Filter, ArrowUpDown, X } from 'lucide-react';
import { api } from '@/lib/api';

interface ProductListProps {
  products: Product[];
  totalCount?: number;
  title?: string;
}

export default function ProductList({ products, totalCount, title }: ProductListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<Category[]>([]);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    // Fetch categories
    api.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const min = searchParams.get('minPrice');
    const max = searchParams.get('maxPrice');
    const cats = searchParams.get('category')?.split(',').filter(Boolean) || [];
    
    console.log(min, max, cats);

    setPriceRange([
      min ? Number(min) : 0,
      max ? Number(max) : 50000
    ]);
    setSelectedCategories(new Set(cats));
  }, [searchParams]);

  const handleFilterChange = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const handlePriceChange = useCallback((values: [number, number]) => {
    setPriceRange(values);
  }, []);

  const toggleCategory = useCallback((categoryId: string) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  // console.log(selectedCategories.has('2'));

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());

    const selectedCategoryArray = Array.from(selectedCategories);
    if (selectedCategoryArray.length > 0) {
      params.set('category', selectedCategoryArray.join(','));
    } else {
      params.delete('category');
    }
    router.push(`?${params.toString()}`);
    setShowFilter(false);
  }, [router, searchParams, priceRange, selectedCategories]);

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-10 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-lg font-medium">{title || 'All Products'}</h1>
            {totalCount && (
              <p className="text-sm text-gray-600">{totalCount.toLocaleString()} Items</p>
            )}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowSort(true)}
              className="flex bg-white items-center gap-1 px-3 py-1.5 border rounded-lg text-sm"
            >
              Sort
              <ArrowUpDown className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowFilter(true)}
              className="flex bg-white items-center gap-1 px-3 py-1.5 border rounded-lg text-sm"
            >
              Filter
              <Filter className="w-4 h-4" />
              {selectedCategories.size > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                  {selectedCategories.size}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4">
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      {/* Sort Bottom Sheet */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          showSort ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowSort(false)}
      >
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 transition-transform duration-300 lg:mb-0 mb-16 ${
            showSort ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Sort By</h3>
            <button onClick={() => setShowSort(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Newest First', value: 'newest' },
              { label: 'Price: Low to High', value: 'price-low' },
              { label: 'Price: High to Low', value: 'price-high' },
            ].map((option) => (
              <button
                key={option.value}
                className={`w-full text-left p-3 rounded-lg ${
                  searchParams.get('sort') === option.value
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  handleFilterChange('sort', option.value);
                  setShowSort(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Bottom Sheet */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          showFilter ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowFilter(false)}
      >
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 transition-transform duration-300 lg:mb-0 mb-16 ${
            showFilter ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Filter</h3>
              {selectedCategories.size > 0 && (
                <p className="text-sm text-gray-600">
                  {selectedCategories.size} selected
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              {(selectedCategories.size > 0 || priceRange[0] > 0 || priceRange[1] < 50000) && (
                <button 
                  onClick={() => {
                    setSelectedCategories(new Set());
                    setPriceRange([0, 50000]);
                  }}
                  className="text-sm text-gray-600"
                >
                  Clear all
                </button>
              )}
              <button onClick={() => setShowFilter(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-4">Price Range</h4>
              <RangeSlider
                min={0}
                max={50000}
                step={100}
                value={priceRange}
                onChange={handlePriceChange}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Category</h4>
                {selectedCategories.size > 0 && (
                  <button 
                    onClick={() => setSelectedCategories(new Set())}
                    className="text-sm text-gray-600"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id.toString())}
                        // Start of Selection
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                          selectedCategories.has(category.id.toString())
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:text-gray-900'
                        }`}
                  >
                    <span>{category.name}</span>
                      <span className="ml-1 text-xs text-gray-500">
                        ({category.productCount})
                      </span>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={applyFilters}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 