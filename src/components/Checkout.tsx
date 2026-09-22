import { useState } from 'react';
import { X, CreditCard, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    clearCart();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" />
        <div className="relative w-full max-w-md bg-stone-900 border border-amber-900/30 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="font-serif text-2xl text-amber-50 mb-2">Order Confirmed!</h2>
          <p className="text-amber-200/70 mb-2">
            Thank you for your order. Your exceptional coffee is on its way.
          </p>
          <p className="text-amber-400/50 text-sm mb-6">
            Order #EB-{Math.random().toString(36).substring(2, 8).toUpperCase()}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-xl transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-stone-900 border border-amber-900/30 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-stone-900 border-b border-amber-900/20 p-5 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-stone-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-amber-200" />
            </button>
            <h2 className="font-serif text-xl text-amber-50">Checkout</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-800 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-amber-200" />
          </button>
        </div>

        {/* Order Summary */}
        <div className="p-5 border-b border-amber-900/20">
          <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
            Order Summary
          </h3>
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-amber-200/80">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="text-amber-100">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-amber-900/20">
            <span className="text-amber-200 font-medium">Total</span>
            <span className="text-lg font-bold text-amber-100">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
              Contact Information
            </h3>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-800/80 border border-amber-900/30 rounded-xl text-sm text-amber-50 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
              />
              <input
                type="text"
                placeholder="Full name"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-800/80 border border-amber-900/30 rounded-xl text-sm text-amber-50 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
              />
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
              Shipping Address
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Street address"
                required
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-800/80 border border-amber-900/30 rounded-xl text-sm text-amber-50 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-800/80 border border-amber-900/30 rounded-xl text-sm text-amber-50 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
                />
                <input
                  type="text"
                  placeholder="ZIP code"
                  required
                  value={formData.zip}
                  onChange={(e) => handleChange('zip', e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-800/80 border border-amber-900/30 rounded-xl text-sm text-amber-50 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5" />
              Payment Details
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Card number"
                required
                value={formData.cardNumber}
                onChange={(e) => handleChange('cardNumber', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-800/80 border border-amber-900/30 rounded-xl text-sm text-amber-50 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  required
                  value={formData.expiry}
                  onChange={(e) => handleChange('expiry', e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-800/80 border border-amber-900/30 rounded-xl text-sm text-amber-50 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  required
                  value={formData.cvv}
                  onChange={(e) => handleChange('cvv', e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-800/80 border border-amber-900/30 rounded-xl text-sm text-amber-50 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98] mt-2"
          >
            Place Order — ${totalPrice.toFixed(2)}
          </button>

          <p className="text-center text-xs text-amber-400/40">
            This is a simulated checkout. No real payment will be processed.
          </p>
        </form>
      </div>
    </div>
  );
}
