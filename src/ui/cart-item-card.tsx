import {
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';
import { type CartItem } from '~/entities/cart/types';
import { cartStore } from '~/entities/cart/store';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

export type CartItemCardProps = {
  cartItem: CartItem;
};

export const CartItemCard: FC<CartItemCardProps> = observer(({ cartItem }) => (
  <Card>
    <CardMedia sx={{ height: 200 }} image={cartItem.product.image} title={cartItem.product.title} />
    <CardContent>
      <Typography gutterBottom variant="h5">
        {cartItem.product.title}
      </Typography>
      <Typography gutterBottom variant="body2" color="text.secondary">
        {cartItem.product.description}
      </Typography>
      <Typography variant="body2">Количество: {cartItem.quantity}</Typography>
      <Typography variant="body2">Стоимость: {cartItem.product.price} руб.</Typography>
    </CardContent>
    <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
      <ButtonGroup aria-label="cart item actions button group">
        <IconButton
          disabled={cartItem.quantity === MAX_QUANTITY}
          aria-label="add cart item"
          onClick={() => cartStore.addItem(cartItem.product.id)}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          disabled={cartItem.quantity === MIN_QUANTITY}
          aria-label="remove cart item"
          onClick={() => cartStore.removeItem(cartItem.product.id)}
        >
          <RemoveIcon />
        </IconButton>
      </ButtonGroup>
      <IconButton
        color="error"
        aria-label="remove cart item completely"
        onClick={() => cartStore.removeItemCompletely(cartItem.product.id)}
      >
        <DeleteIcon />
      </IconButton>
    </CardActions>
  </Card>
));
