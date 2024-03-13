import { request } from '~/lib/fetch/request';

// NOTE: Не описываю весь тип, т.к. остальные поля попросту не используются
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

const getProducts = async (): Promise<Product[]> =>
  request({
    path: 'https://fakestoreapi.com/products',
    method: 'GET',
  });

export const api = { getProducts };
