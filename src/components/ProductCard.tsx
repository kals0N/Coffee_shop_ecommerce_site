import { Star, Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-stone-800/40 border border-amber-900/20 rounded-2xl overflow-hidden hover:border-amber-700/40 hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-300">
      {/* Image */}
      <div
        className="relative h-52 sm:h-56 overflow-hidden cursor-pointer"
        onClick={() => onSelect(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-amber-500/90 text-stone-900 text-xs font-semibold rounded-full backdrop-blur-sm">
            {product.roast} Roast
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-amber-200/80 text-xs tracking-wide uppercase">
            {product.origin}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-serif text-lg text-amber-50 cursor-pointer hover:text-amber-300 transition-colors"
            onClick={() => onSelect(product)}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs text-amber-300/80">{product.rating}</span>
          </div>
        </div>

        {/* Tasting Notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map(note => (
            <span
              key={note}
              className="px-2 py-0.5 bg-amber-900/20 border border-amber-800/30 text-amber-300/80 text-[11px] rounded-full"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price & Add */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-semibold text-amber-100">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-amber-400/60 ml-1.5">/ {product.weight}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-stone-900 text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
