'use client';

import { Home, Heart, ShoppingCart, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = useMemo(() => [
    {
      label: 'Home',
      href: '/',
      icon: Home,
    },
    {
      label: 'Wishlist',
      href: '/wishlist',
      icon: Heart,
    },
    {
      label: 'Cart',
      href: '/cart',
      icon: ShoppingCart,
      isSpecial: true,
    },
    {
      label: 'Search',
      href: '/search',
      icon: Search,
    },
    {
      label: 'Setting',
      href: '/settings',
      icon: Settings,
    },
  ], []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="flex items-center justify-around h-16 relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          if (item.isSpecial) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`absolute left-1/2 -translate-x-1/2 -translate-y-4
                  flex flex-col items-center justify-center p-4
                  rounded-full bg-white shadow-lg z-30
                  ${isActive ? 'bg-red-600' : 'bg-white'}`}
              >
                <item.icon className="w-6 h-6 text-black stroke-[2px]" />
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 p-2 font-medium ${
                isActive ? 'text-red-500' : 'text-black'
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 