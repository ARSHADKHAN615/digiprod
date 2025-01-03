'use client';

import Image from 'next/image';
import { Star, MapPin, ArrowLeft, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { Product, ProductDetails } from '@/lib/types';
import { use } from 'react';

function ProductImageCarousel({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full h-80">
            <Image
                src={images[currentIndex]}
                alt="Product image"
                fill
                className="object-cover rounded-lg"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full shadow-lg"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full shadow-lg"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}

            {/* Dots Navigation */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-primary' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="pb-16 animate-pulse">
            {/* Header */}
            <header className="flex items-center justify-between p-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            </header>

            {/* Image Skeleton */}
            <div className="relative w-full h-80 bg-gray-200 rounded-lg mx-auto mb-4" />

            {/* Content */}
            <div className="p-4 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                    <div className="h-7 bg-gray-200 rounded-md w-3/4" />
                    <div className="h-4 bg-gray-200 rounded-md w-1/2" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
                        ))}
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-16" />
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                    <div className="h-6 bg-gray-200 rounded w-24" />
                    <div className="h-6 bg-gray-200 rounded w-16" />
                </div>

                {/* Size Selection */}
                <div className="space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-20" />
                    <div className="flex flex-wrap gap-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-10 bg-gray-200 rounded-full w-16" />
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-32" />
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                </div>

                {/* Delivery Info */}
                <div className="p-4 bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-200 rounded-full" />
                        <div className="space-y-1">
                            <div className="h-4 bg-gray-200 rounded w-24" />
                            <div className="h-4 bg-gray-200 rounded w-32" />
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="h-6 bg-gray-200 rounded w-24" />
                        <div className="h-4 bg-gray-200 rounded w-16" />
                    </div>
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="min-w-[200px] w-[200px] h-[250px] bg-gray-200 rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 flex gap-4 p-4 bg-white border-t">
                <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
                <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
            </div>
        </div>
    );
}

export default function ProductPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const resolvedParams = use(params);
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [selectedSize, setSelectedSize] = useState('7 UK');
    const [loading, setLoading] = useState(true);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        async function loadProduct() {
            try {
                const productData = await api.getProductById(resolvedParams.id);
                if (!productData) {
                    throw new Error('Product not found');
                }
                setProduct(productData);
                setSelectedSize(productData.sizes[0]);

                const similar = await api.getSimilarProducts(productData.category.id);
                setSimilarProducts(similar);
            } catch (error) {
                console.error('Error loading product:', error);
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [resolvedParams.id]);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (!product) {
        return <div className="p-4">Product not found</div>;
    }

    return (
        <div className="pb-16">
            {/* Header */}
            <header className="flex items-center justify-between p-4">
                <Link href="/" className="p-2">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <Link href="/cart" className="p-2">
                    <ShoppingCart className="w-6 h-6" />
                </Link>
            </header>

            {/* Product Image Carousel */}
            <ProductImageCarousel images={product.images} />

            {/* Product Info */}
            <div className="p-4 space-y-4">
                <div>
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                        />
                    ))}
                    <span className="text-gray-600 ml-1">{product.reviews.toLocaleString()}</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    {product.originalPrice && (
                        <span className="text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                        <span className="text-primary">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                        </span>
                    )}
                </div>

                {/* Size Selection */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Size: {selectedSize}</h3>
                        <button className="text-primary text-sm">Size Guide</button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`relative px-4 py-2 rounded-full border transition-all duration-200 ${
                                    size === selectedSize
                                        ? 'border-primary bg-primary/10 text-primary scale-110 shadow-sm'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                {size}
                                {/* {size === selectedSize && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white" />
                                )} */}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div>
                    <h3 className="font-semibold mb-2">Product Details</h3>
                    <div className="relative">
                        <p className={`text-gray-600 text-sm ${!showFullDescription && 'line-clamp-3'}`}>
                            {product.description || 'No description available'}
                        </p>
                        {product.description && product.description.length > 150 && (
                            <button 
                                onClick={toggleDescription}
                                className="text-primary text-sm mt-1 flex items-center gap-1"
                            >
                                {showFullDescription ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                    <button 
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#4A55A2] text-white font-medium hover:bg-[#4A55A2]/90"
                        onClick={() => {
                            // Add to cart logic here
                        }}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Go to cart
                    </button>
                    <button 
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#50C878] text-white font-medium hover:bg-[#50C878]/90"
                        onClick={() => {
                            // Buy now logic here
                        }}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="currentColor"/>
                        </svg>
                        Buy Now
                    </button>
                </div>

                {/* Delivery Info */}
                <div className="flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                    <MapPin className="text-primary" />
                    <div>
                        <p className="text-sm">Delivery in</p>
                        <p className="font-semibold">1 within Hour</p>
                    </div>
                </div>

                {/* Similar Products */}
                {similarProducts.length > 0 && (
                    <section className="px-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Similar To</h2>
                            <div className="text-sm text-gray-600">Summer&apos;25 Collections</div>
                        </div>
                        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                            {similarProducts.map((product) => (
                                <div key={product.id} className="min-w-[200px] w-[200px]">
                                    <ProductCard {...product} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}