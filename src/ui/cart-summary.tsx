import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';
import { cartStore } from '~/entities/cart/store';

export const CartSummary: FC = observer(() => (
  <Typography>Итого: {cartStore.totalPrice} руб.</Typography>
));
