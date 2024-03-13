import { Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';
import { cartStore } from '~/entities/cart/store';

// NOTE: Не совсем понял что имелось в виду в задание, общая итоговая сумма или общая итоговая сумма + итоговая на каждый взятый отдельный товар
export const CartSummary: FC = observer(() => (
  <div>
    <Typography variant="h6">Итоговая сумма:</Typography>
    <Typography gutterBottom>{cartStore.totalPrice} руб.</Typography>
    <Typography variant="h6">Итоговая сумма по всем заказам:</Typography>
    <Stack spacing={1}>
      {cartStore.itemSummaryInfo.map((item) => (
        <Typography key={item.title}>
          {item.title} ({item.quantity} шт.) - {item.totalPrice} руб.
        </Typography>
      ))}
    </Stack>
  </div>
));
