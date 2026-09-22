import { Search, ShoppingBag, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Coffee className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
            <div>
              <h1 className="text-lg sm:text-xl font-serif font-bold text-amber-50 tracking-wide">
                Ember & Bloom
              </h1>
              <p className="text-[10px] sm:text-xs text-amber-400/70 tracking-widest uppercase -mt-0.5">
                Specialty Coffee
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
              <input
                type="text"
                placeholder="Search coffees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-800/80 border border-amber-900/30 rounded-full text-sm text-amber-50 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
              />
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 sm:p-3 rounded-full bg-stone-800/60 border border-amber-900/30 hover:border-amber-500/50 hover:bg-stone-800 transition-all group"
          >
            <ShoppingBag className="w-5 h-5 text-amber-100 group-hover:text-amber-400 transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-stone-900 text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
            <input
              type="text"
              placeholder="Search coffees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-800/80 border border-amber-900/30 rounded-full text-sm text-amber-50 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
