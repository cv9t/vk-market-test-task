import { AppBar, Box, CircularProgress, Container, Grid, Toolbar, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { type ReactNode, type FC } from 'react';
import { cartStore } from '~/entities/cart/store';
import { useMount } from '~/lib/react/use-mount';
import { CartItemList } from '~/ui/cart-item-list';
import { CartSummary } from '~/ui/cart-summary';

export const App: FC = observer(() => {
  useMount(() => {
    cartStore.loadCart();
  });

  const renderContent = (): ReactNode => {
    if (!cartStore.isLoaded) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      );
    }
    if (cartStore.error) {
      return <Typography>Ошибка при загрузке данных 😔</Typography>;
    }
    return <MainContent />;
  };

  return (
    <>
      <AppBar position="static" sx={{ marginBottom: 2 }}>
        <Toolbar>
          <Typography>Задание для стажировки</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false}>{renderContent()}</Container>
    </>
  );
});

const MainContent: FC = () => (
  <Grid container spacing={2}>
    <Grid item xs={9}>
      <CartItemList />
    </Grid>
    <Grid item xs={3}>
      <CartSummary />
    </Grid>
  </Grid>
);
