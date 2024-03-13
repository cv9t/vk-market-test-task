import { type Product } from '~/api';
import { type Cart } from './types';

export const mapCart = (products: Product[]): Cart => {
  const itemsMap = products.reduce((acc: Cart['itemsMap'], product) => {
    acc[product.id] = {
      product: {
        ...product,
        // NOTE: Конвертация доллара в рубль :D
        price: product.price * 100,
      },
      quantity: 1,
    };
    return acc;
  }, {});

  return { itemsMap };
};
