export interface Product {
  productId: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  brand: string;
  stock: number;
  categories: [String];
}
