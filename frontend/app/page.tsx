import Image from 'next/image';
import { api } from '@/lib/api';
import Header from '@/components/layout/Header';
import { ArrowRight, ArrowUpDown, Calendar, Clock, Filter} from 'lucide-react';
import ProductCarousel from '@/components/ui/ProductCarousel'
import Link from 'next/link';

export default async function HomePage() {
  const [featured, trending, categories] = await Promise.all([
    api.getFeaturedProducts(),
    api.getTrendingProducts(),
    api.getCategories()
  ]);

  return (
    <>
      <Header />
      <main className="pb-20">
        {/* Categories Section */}
        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">All Featured</h2>
            <div className="flex gap-2">
              <Link href="/products">
                <button className="flex bg-white items-center gap-1 px-3 py-1.5 border rounded-lg text-sm">
                  Sort
                  <ArrowUpDown className="w-4 h-4 ml-1" />
                </button>
              </Link>
              <Link href="/products">
                <button className="flex bg-white items-center gap-1 px-3 py-1.5 border rounded-lg text-sm">
                  Filter
                  <Filter className="w-4 h-4 ml-1" />
                </button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="flex overflow-x-auto hide-scrollbar pb-2 -mx-4 scroll-smooth rounded-lg lg:bg-white lg:justify-around">
              {categories.map((category, index) => (
                <Link href={`/products?category=${category.id}`} key={category.id}>
                  <div className={`flex flex-col items-center min-w-[5rem] w-[5rem] bg-white p-2 ${index === 0 ? 'ml-4 rounded-l-lg' : ''}`}>
                    <div className="relative w-16 h-16 mb-2 overflow-hidden">
                      <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sale Banner */}
        <section className="px-4 mb-6">
          <div className="relative rounded-2xl overflow-hidden h-[300px] lg:h-[500px]">
            <Image
              src="/deals-bg.png"
              alt="Sale Banner"
              fill
              className="object-fill lg:object-fit"
            />
            <div className="absolute inset-0">
              <div className="p-6 text-white h-full flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-2">50-40% OFF</h2>
                <p>Now in products!</p>
                <p className="text-sm mb-4">All colours</p>
                <Link href="/products">
                  <button className="flex items-center gap-1 border-2 border-white text-white px-6 py-2 rounded-lg w-fit font-medium">
                    Shop Now 
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Deal of the Day */}
        <section className="px-4 mb-6">
          <div className="bg-blue-500 text-white rounded-lg p-4 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-medium">Deal of the Day</h2>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>22h 55m 20s remaining</span>
                </div>
              </div>
            </div>
            <Link href="/products">
              <button className="flex items-center gap-1 border-2 border-white text-white px-4 py-1 rounded-lg font-medium">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
          </div>
          <ProductCarousel products={featured.slice(0, 3)} id="dealCarousel" />
        </section>


        {/* Special Offers */}
        <section className="px-4 mb-6">
          <div className="bg-white rounded-xl p-4">
            <div className="flex lg:flex-col items-center justify-between gap-2">
              <div className="p-2 rounded-full text-4xl w-[200px] lg:h-[150px]">
                <Image src="/special-offer.png" alt="Gift" width={200} height={200} className="object-contain" />
              </div>
              <div className="lg:text-center text-left">
                <h3 className="text-lg lg:text-4xl font-semibold">Special Offers
                  <span className="ml-2 border-2 border-gray-500 rounded-full p-1 lg:text-2xl text-sm">
                    <span>😱</span>
                  </span>
                </h3>
                <p className="text-sm lg:text-lg text-gray-600">We make sure you get the offer you need at best prices</p>
              </div>
            </div>
          </div>
        </section>

        {/* Flat and Heels */}
        <section className="px-4 mb-6">
          <div className="p-2 bg-white pl-0">
            <div className="flex lg:flex-col items-center justify-between bg-body py-6 px-2 border-l-[6px] border-l-[#FD6E87]">
              <div className="relative w-32 h-32 lg:w-48 lg:h-48">
                <Image
                  src="/shoes.png"
                  alt="Flat and Heels Collection"
                  fill
                  className="object-contain"
                />
                <div className="absolute -left-4 top-0 w-24 h-24 bg-yellow-100/50 rounded-full blur-xl -z-10" />
              </div>
              <div className="flex-1 ml-8">
                <h3 className="text-2xl font-semibold mb-2 text-center lg:text-4xl">Flat and Heels</h3>
                <p className="text-gray-600 mb-4 text-center lg:text-lg">Stand a chance to get rewarded</p>
                <div className="flex justify-end lg:justify-center">
                  <Link href="/products">
                  <button className="bg-[#FD6E87] text-white px-4 py-1 rounded-lg hover:bg-[#FD6E87] transition-colors flex items-center gap-2 font-medium">
                    Visit now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="px-4 mb-6">
          <div className="bg-[#FD6E87] text-white rounded-lg p-4 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-medium">Trending Products</h2>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Last Date 20/01/2025</span>
                </div>
              </div>
            </div>
            <Link href="/products">
              <button className="flex items-center gap-1 border-2 border-white text-white px-4 py-1 rounded-lg font-medium">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
          </div>
          <ProductCarousel products={trending} id="trendingCarousel" />
        </section>

        {/* Summer Sale Banner */}
        <section className="px-4 mb-6">
          <div className="bg-white rounded-xl overflow-hidden">
            <Image
              src="/summer-sale.png"
              alt="Summer Sale"
              width={400}
              height={200}
              className="w-full h-auto"
            />
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-medium">New Arrivals</h2>
                  <div className="flex items-center text-sm">
                    <span>Summer&apos;25 Collections</span>
                  </div>
                </div>
              </div>
              <Link href="/products?sort=newest">
              <button className="bg-[#FD6E87] text-white px-4 py-1 rounded-lg flex items-center gap-1 font-medium">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sponsored Section */}
        <section className="px-4 mb-6">
          <div className="bg-white p-2">
          <h2 className="text-lg font-semibold mb-4">Sponsored</h2>
          <Link href="/products">
            <div className="overflow-hidden">
              <div className="relative h-[200px] w-full rounded-lg">
                <Image
                  src="/shoes.png"
                  alt="Up to 50% Off Shoes"
                  fill
                  className="object-cover rounded-lg overflow-hidden"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-3xl font-bold mb-2">UP TO</h3>
                    <p className="text-4xl font-bold">50% OFF</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
              <div className="p-4">
                <p className="text-lg font-medium">Up to 50% Off</p>
              </div>
                <button className="text-primary text-sm">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
