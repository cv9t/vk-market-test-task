import { api, type Product } from '~/api';
import { type CartItem, type Cart } from './types';
import { mapCart } from './lib';
import { makeAutoObservable } from 'mobx';
import { assert } from '~/lib/typescript/assert';
import { ApiError } from '~/lib/fetch/api-error';
import { errorToString } from '~/lib/string/error-to-string';

class CartStore {
  cart: Nullable<Cart> = null;
  error: Nullable<string> = null;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCart(cart: Cart): void {
    this.cart = cart;
  }

  setError(error: Nullable<string>): void {
    this.error = error;
  }

  setIsLoaded(isLoaded: boolean): void {
    this.isLoaded = isLoaded;
  }

  get cartItems(): CartItem[] {
    return this.cart ? Object.values(this.cart.itemsMap) : [];
  }

  get isEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  get totalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  get itemSummaryInfo(): { title: string; quantity: number; totalPrice: number }[] {
    return this.cartItems.map((item) => ({
      title: item.product.title,
      quantity: item.quantity,
      totalPrice: item.product.price * item.quantity,
    }));
  }

  async loadCart(): Promise<void> {
    this.setIsLoaded(false);
    this.setError(null);

    try {
      const products = await api.getProducts();
      this.setCart(mapCart(products));
    } catch (error) {
      this.setError(error instanceof ApiError ? error.explanation : errorToString(error));
    } finally {
      this.setIsLoaded(true);
    }
  }

  addItem(productId: Product['id']): void {
    assert(this.cart, 'cart is not loaded in addItem');
    this.cart.itemsMap[productId].quantity += 1;
  }

  removeItem(productId: Product['id']): void {
    assert(this.cart, 'cart is not loaded in removeItem');
    this.cart.itemsMap[productId].quantity -= 1;
  }

  removeItemCompletely(productId: Product['id']): void {
    assert(this.cart, 'cart is not loaded in removeItemCompletely');
    delete this.cart.itemsMap[productId];
  }
}

// NOTE: Создаю синглтон, потому что SSR не подразумевается и в рамках выполняемой задачи данный класс будет в единственном экземпляре
export const cartStore = new CartStore();
