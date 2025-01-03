import { ShoppingCart, Menu, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '../ui/SearchBar';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-body">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* Mobile Menu - Visible on mobile only */}
          <button className="p-2 lg:hidden">
            <Menu className="w-6 h-6" />
          </button>

              {/* Logo */}
              <Link href="/">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="Stylish"
                    width={150}
                    height={320}
                    className="lg:w-[150] lg:h-[40] sm:w-10 sm:h-10"
                  />
                </div>
              </Link>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <SearchBar className="hidden lg:flex w-72" />
            <button className="p-2 hidden md:block">
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button className="p-2">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search - Visible on mobile only */}
        <div className="p-4 lg:hidden">
          <SearchBar className="w-full" />
        </div>
      </div>
    </header>
  );
} 