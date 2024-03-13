import { type Product } from '~/api';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  itemsMap: Record<Product['id'], CartItem>;
};
