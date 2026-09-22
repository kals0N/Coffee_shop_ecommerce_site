import { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { products, categories } from './data/products';
import { Product, Category } from './types';
import { Coffee, SlidersHorizontal } from 'lucide-react';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some(note =>
          note.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-stone-950 text-amber-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-stone-950 to-stone-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Freshly Roasted
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-50 leading-tight mb-4">
              Exceptional Coffee,{' '}
              <span className="text-amber-400">Thoughtfully Sourced</span>
            </h2>
            <p className="text-amber-200/60 text-base sm:text-lg leading-relaxed max-w-xl">
              From the world's finest growing regions to your cup. Each bean is
              carefully selected, expertly roasted, and delivered at peak freshness.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="w-4 h-4 text-amber-400/70" />
          <span className="text-xs font-semibold text-amber-400/70 uppercase tracking-widest">
            Browse by Category
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as Category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-amber-500 text-stone-900 shadow-lg shadow-amber-500/20'
                  : 'bg-stone-800/60 text-amber-200/70 border border-amber-900/20 hover:border-amber-700/40 hover:text-amber-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Coffee className="w-12 h-12 text-amber-800/50 mx-auto mb-4" />
            <p className="text-amber-200/60 text-lg mb-1">No coffees found</p>
            <p className="text-amber-400/40 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-900/20 bg-stone-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Coffee className="w-5 h-5 text-amber-400" />
                <span className="font-serif text-lg font-bold text-amber-50">
                  Ember & Bloom
                </span>
              </div>
              <p className="text-sm text-amber-200/50 leading-relaxed">
                Dedicated to bringing you the world's finest specialty coffees,
                roasted with care and delivered with love.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
                Our Promise
              </h4>
              <ul className="space-y-2 text-sm text-amber-200/50">
                <li>• Ethically sourced beans</li>
                <li>• Roasted within 48 hours</li>
                <li>• Free shipping over $40</li>
                <li>• Freshness guaranteed</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
                Connect
              </h4>
              <ul className="space-y-2 text-sm text-amber-200/50">
                <li>• hello@emberandbloom.co</li>
                <li>• @emberandbloom</li>
                <li>• Roastery Tours Available</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-amber-900/20 text-center">
            <p className="text-xs text-amber-400/30">
              © 2026 Ember & Bloom Coffee Co. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Cart onCheckout={() => setIsCheckoutOpen(true)} />

      {isCheckoutOpen && (
        <Checkout onClose={() => setIsCheckoutOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
