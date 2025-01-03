import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  description?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  discount,
  description
}: ProductCardProps) {

    console.log(description);
  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white rounded-lg border border-gray-100">
        <div className="relative aspect-[4/4] overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-3 space-y-2">
          <h3 className="font-medium text-lg line-clamp-1">{name}</h3>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
          
          <div className="flex flex-col gap-1">
            <span className="text-xl font-medium">₹{price.toLocaleString()}</span>
            <div className="flex items-center gap-2">
            {originalPrice && (
              <>
                <span className="text-gray-400 line-through text-sm">₹{originalPrice.toLocaleString()}</span>
                {discount && (
                  <span className="text-red-500 text-sm">{discount}% Off</span>
                )}
              </>
            )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">{reviews.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 