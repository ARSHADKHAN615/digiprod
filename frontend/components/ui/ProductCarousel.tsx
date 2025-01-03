'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'
import { Product } from '@/lib/types'
import { useEffect, useState } from 'react'

interface ProductCarouselProps {
  products: Product[]
  id: string
}

export default function ProductCarousel({ products, id }: ProductCarouselProps) {
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  useEffect(() => {
    const container = document.getElementById(id)
    
    const handleScroll = () => {
      if (!container) return
      
      // Show left button if scrolled right
      setShowLeftButton(container.scrollLeft > 0)
      
      // Hide right button if can't scroll further right
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1
      setShowRightButton(!isAtEnd)
    }

    container?.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()

    return () => container?.removeEventListener('scroll', handleScroll)
  }, [id])

  return (
    <div className="relative">
      <div className="flex overflow-x-auto hide-scrollbar pb-2 -mx-4 scroll-smooth" id={id}>
        {products.map((product) => (
          <div key={product.id} className="min-w-[250px] w-[250px] pl-4">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      {showLeftButton && (
        <button 
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-opacity"
          onClick={() => document.getElementById(id)?.scrollBy(-260, 0)}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      {showRightButton && (
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-opacity"
          onClick={() => document.getElementById(id)?.scrollBy(260, 0)}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  )
} 