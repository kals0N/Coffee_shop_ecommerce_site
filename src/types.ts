export interface Product {
  id: string;
  name: string;
  origin: string;
  category: string;
  price: number;
  weight: string;
  roast: string;
  description: string;
  notes: string[];
  image: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = 'all' | 'single-origin' | 'blend' | 'decaf' | 'espresso';
