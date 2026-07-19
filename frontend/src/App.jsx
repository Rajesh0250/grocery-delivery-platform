import { useMemo, useState } from 'react';
import { Box, Button, Card, CardContent, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';

const categories = ['Fresh', 'Bakery', 'Pantry', 'Beverages', 'Snacks', 'Household'];
const products = [
  { name: 'Organic Bananas', price: 2.49, badge: 'Fresh Pick' },
  { name: 'Free Range Eggs', price: 4.99, badge: 'Popular' },
  { name: 'Whole Grain Bread', price: 3.29, badge: 'Baked Today' },
  { name: 'Almond Milk', price: 3.89, badge: 'New' }
];

export default function App() {
  const [cartCount, setCartCount] = useState(2);
  const total = useMemo(() => products.slice(0, 2).reduce((sum, p) => sum + p.price, 0), []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
          <Box>
            <Typography variant="h4" fontWeight={700}>GreenBasket</Typography>
            <Typography color="text.secondary">Fast, reliable grocery delivery for modern households.</Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Chip label="Same day delivery" color="primary" />
            <Chip label="Live inventory" color="secondary" />
          </Stack>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>Today's essentials</Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2, overflowX: 'auto' }}>
              {categories.map((cat) => <Chip key={cat} label={cat} variant="outlined" />)}
            </Stack>
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} key={product.name}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="primary">{product.badge}</Typography>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography color="text.secondary">Freshly stocked and ready for delivery.</Typography>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                        <Typography fontWeight={700}>${product.price.toFixed(2)}</Typography>
                        <Button variant="contained" onClick={() => setCartCount((v) => v + 1)}>Add</Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600}>Cart</Typography>
            <Typography color="text.secondary">{cartCount} items selected</Typography>
            <Box sx={{ mt: 2, borderTop: 1, borderColor: 'divider', pt: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Subtotal</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </Stack>
              <Button fullWidth variant="contained" sx={{ mt: 2 }}>Checkout</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
