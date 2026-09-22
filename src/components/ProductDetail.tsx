import { X, Star, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-stone-900 border border-amber-900/30 rounded-3xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-stone-800/80 rounded-full border border-amber-900/30 hover:border-amber-500/50 transition-colors"
        >
          <X className="w-4 h-4 text-amber-200" />
        </button>

        {/* Image */}
        <div className="relative h-64 sm:h-72 overflow-hidden rounded-t-3xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <p className="text-amber-400/80 text-sm tracking-widest uppercase mb-1">
              {product.origin}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-amber-50 font-bold">
              {product.name}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-sm text-amber-200">{product.rating}</span>
            </div>
            <span className="w-1 h-1 bg-amber-700 rounded-full" />
            <span className="text-sm text-amber-300/70">{product.roast} Roast</span>
            <span className="w-1 h-1 bg-amber-700 rounded-full" />
            <span className="text-sm text-amber-300/70">{product.weight}</span>
          </div>

          {/* Description */}
          <p className="text-amber-100/80 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Tasting Notes */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
              Tasting Notes
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.notes.map(note => (
                <span
                  key={note}
                  className="px-3 py-1.5 bg-amber-900/20 border border-amber-800/30 text-amber-200 text-sm rounded-full"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between pt-5 border-t border-amber-900/20">
            <div>
              <span className="text-3xl font-bold text-amber-100">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Quantity Controls */}
              <div className="flex items-center gap-1 bg-stone-800 border border-amber-900/30 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:text-amber-400 text-amber-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-amber-100 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:text-amber-400 text-amber-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/20 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
