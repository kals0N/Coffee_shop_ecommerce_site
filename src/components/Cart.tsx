import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  onCheckout: () => void;
}

export default function Cart({ onCheckout }: CartProps) {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel */}
      <div className="relative w-full max-w-md bg-stone-900 border-l border-amber-900/30 shadow-2xl flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-amber-900/20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif text-xl text-amber-50">Your Cart</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-stone-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-amber-200" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-12 h-12 text-amber-800/50 mb-4" />
              <p className="text-amber-200/60 text-lg mb-1">Your cart is empty</p>
              <p className="text-amber-400/40 text-sm">Add some exceptional coffee to get started</p>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 bg-stone-800/50 border border-amber-900/20 rounded-xl"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-amber-100 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-amber-400/60 mt-0.5">
                    ${item.product.price.toFixed(2)} / {item.product.weight}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-0.5 bg-stone-900 border border-amber-900/30 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:text-amber-400 text-amber-300/70 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs text-amber-100 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:text-amber-400 text-amber-300/70 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-amber-100">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-red-400/60 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-amber-900/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-amber-200/70">Subtotal</span>
              <span className="text-xl font-bold text-amber-100">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-amber-400/50 text-center">
              Shipping & taxes calculated at checkout
            </p>
            <button
              onClick={() => {
                setIsCartOpen(false);
                onCheckout();
              }}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
