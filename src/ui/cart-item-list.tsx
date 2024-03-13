import { observer } from 'mobx-react-lite';
import { type FC } from 'react';
import { cartStore } from '~/entities/cart/store';
import { CartItemCard } from './cart-item-card';
import { Stack, Typography } from '@mui/material';

export const CartItemList: FC = observer(() => {
  if (cartStore.isEmpty) {
    return <Typography>Список товаров в корзине пуст</Typography>;
  }

  return (
    <Stack spacing={2}>
      {cartStore.cartItems.map((item) => (
        <CartItemCard key={item.product.id} cartItem={item} />
      ))}
    </Stack>
  );
});
