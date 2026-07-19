import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add,
  ArrowForward,
  CreditCard,
  Delete,
  Favorite,
  FavoriteBorder,
  LocalOffer,
  LocationOn,
  Notifications,
  Remove,
  Search,
  ShoppingCart,
  Star,
} from '@mui/icons-material';

const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Snacks', 'Drinks', 'Personal Care', 'Baby Care', 'Cleaning'];

const initialProducts = [
  {
    id: 1,
    name: 'Amul Milk',
    brand: 'Amul',
    price: 68,
    discount: 10,
    rating: 4.8,
    reviews: 1294,
    stock: 'In Stock',
    unit: '500 ml',
    category: 'Dairy',
    description: 'Creamy and rich whole milk ideal for tea, coffee, and breakfast bowls.',
    ingredients: 'Milk, vitamins, minerals',
    nutrition: 'Protein 3.5g • Calcium 120mg',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
    ],
    tag: 'Best Seller',
  },
  {
    id: 2,
    name: 'Mother Dairy Paneer',
    brand: 'Mother Dairy',
    price: 92,
    discount: 8,
    rating: 4.7,
    reviews: 842,
    stock: 'In Stock',
    unit: '200 g',
    category: 'Dairy',
    description: 'Soft paneer cubes for curries, wraps, and quick snacks.',
    ingredients: 'Milk, water, citric acid',
    nutrition: 'Protein 18g • Calcium 180mg',
    image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
    ],
    tag: 'New Arrival',
  },
  {
    id: 3,
    name: 'Fresh Bananas',
    brand: 'Fresho',
    price: 49,
    discount: 12,
    rating: 4.9,
    reviews: 564,
    stock: 'In Stock',
    unit: '1 kg',
    category: 'Fruits',
    description: 'Naturally sweet bananas perfect for breakfast and smoothies.',
    ingredients: 'Bananas',
    nutrition: 'Fiber 3.1g • Potassium 358mg',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80',
    ],
    tag: 'Trending',
  },
  {
    id: 4,
    name: 'Farm Eggs',
    brand: 'Eggs & Co',
    price: 84,
    discount: 6,
    rating: 4.6,
    reviews: 701,
    stock: 'In Stock',
    unit: '12 count',
    category: 'Dairy',
    description: 'Protein-rich farm eggs for omelettes, baking, and breakfast.',
    ingredients: 'Eggs',
    nutrition: 'Protein 6g • Vitamin B12',
    image: 'https://images.unsplash.com/photo-1518569656558-1f25e0d0d30f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518569656558-1f25e0d0d30f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=800&q=80',
    ],
    tag: 'Flash Sale',
  },
  {
    id: 5,
    name: 'Coca-Cola 1.25L',
    brand: 'Coca-Cola',
    price: 89,
    discount: 15,
    rating: 4.5,
    reviews: 320,
    stock: 'In Stock',
    unit: '1.25 L',
    category: 'Drinks',
    description: 'Classic fizzy cola for lunch boxes and parties.',
    ingredients: 'Carbonated water, sugar, caramel',
    nutrition: 'Sugar 39g',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    ],
    tag: 'Popular',
  },
  {
    id: 6,
    name: 'Saffola Oats',
    brand: 'Saffola',
    price: 128,
    discount: 11,
    rating: 4.7,
    reviews: 617,
    stock: 'In Stock',
    unit: '500 g',
    category: 'Snacks',
    description: 'Wholesome oats for breakfast and healthy snacking.',
    ingredients: 'Whole oats, vitamins',
    nutrition: 'Fiber 5g • Iron 2.5mg',
    image: 'https://images.unsplash.com/photo-1514000337598-7f5f2f9d4f3f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1514000337598-7f5f2f9d4f3f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
    ],
    tag: 'Healthy Choice',
  },
  {
    id: 7,
    name: 'Dettol Surface Cleaner',
    brand: 'Dettol',
    price: 165,
    discount: 9,
    rating: 4.6,
    reviews: 511,
    stock: 'In Stock',
    unit: '500 ml',
    category: 'Cleaning',
    description: 'Powerful cleaner for kitchen and bathroom surfaces.',
    ingredients: 'Chloroxylenol, alcohol',
    nutrition: 'Disinfecting action',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba189b1a22c2?auto=format&fit=crop&w=800&q=80',
    ],
    tag: 'Daily Essentials',
  },
  {
    id: 8,
    name: 'Pampers Baby Diapers',
    brand: 'Pampers',
    price: 599,
    discount: 14,
    rating: 4.8,
    reviews: 432,
    stock: 'In Stock',
    unit: '72 count',
    category: 'Baby Care',
    description: 'Gentle absorbent diapers for babies with long-lasting comfort.',
    ingredients: 'Soft absorbent material',
    nutrition: 'Soft & breathable',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    ],
    tag: 'Parent Favorite',
  },
];

const offers = [
  { title: 'Flat ₹50 off', subtitle: 'On first order above ₹250', color: '#e8f5e9' },
  { title: 'Free delivery', subtitle: 'Today only on essentials', color: '#fff3e0' },
  { title: 'Buy 2, get 1 free', subtitle: 'On selected dairy', color: '#f3e5f5' },
];

const initialNotifications = [
  { id: 1, title: 'Order confirmed', detail: 'Your order is being packed', time: '2 min ago' },
  { id: 2, title: 'New offer', detail: 'Buy 2 get 1 free on dairy', time: '20 min ago' },
];

function formatCurrency(value) {
  return `₹${value.toFixed(0)}`;
}

function ProductCard({ product, onAdd, onOpen, onWishlist, isWishlisted }) {
  return (
    <Card variant="outlined" sx={{ height: '100%', borderRadius: 3, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <Box component="img" src={product.image} alt={product.name} sx={{ width: '100%', height: 180, objectFit: 'cover' }} />
        <Chip label={`${product.discount}% OFF`} color="secondary" size="small" sx={{ position: 'absolute', top: 12, left: 12 }} />
        <IconButton onClick={() => onWishlist(product)} sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'white' }}>
          {isWishlisted ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">{product.brand}</Typography>
        <Typography variant="h6" fontWeight={700} onClick={() => onOpen(product.id)} sx={{ cursor: 'pointer' }}>{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">{product.unit}</Typography>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Star sx={{ fontSize: 16, color: '#ffb300' }} />
          <Typography variant="body2" fontWeight={600}>{product.rating}</Typography>
          <Typography variant="body2" color="text.secondary">({product.reviews})</Typography>
        </Stack>
        <Typography variant="body2" color="success.main">{product.stock}</Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto' }}>
          <Typography variant="h6" fontWeight={700}>{formatCurrency(product.price)}</Typography>
          <Button variant="contained" size="small" onClick={() => onAdd(product, 1)}>Add</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

function HomePage({ productsList, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, addToCart, navigate, wishlist, toggleWishlist, sortBy, setSortBy }) {
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveBanner((value) => (value + 1) % offers.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const visibleProducts = useMemo(() => {
    const filtered = productsList.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const sorted = [...filtered];
    if (sortBy === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [productsList, searchTerm, selectedCategory, sortBy]);

  return (
    <Box>
      <Paper elevation={0} sx={{ borderRadius: 4, p: { xs: 2, md: 3 }, mb: 3, bgcolor: '#fff8e1' }}>
        <Typography variant="body2" fontWeight={700} color="secondary.main">10 minute delivery to Hyderabad</Typography>
        <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>Fresh groceries at your doorstep</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>Search, save, checkout, and track your groceries in one place.</Typography>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 4, p: 2, mb: 3, bgcolor: '#ffffff' }}>
        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
          {categories.map((category) => (
            <Chip key={category} label={category} clickable color={selectedCategory === category ? 'primary' : 'default'} variant={selectedCategory === category ? 'filled' : 'outlined'} onClick={() => setSelectedCategory(category)} />
          ))}
        </Stack>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 4, p: { xs: 2, md: 3 }, mb: 3, bgcolor: '#ffffff' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
          <Box>
            <Typography variant="h6" fontWeight={700}>Live offers</Typography>
            <Typography color="text.secondary">Offers update continuously for fast delivery shoppers.</Typography>
          </Box>
          <Chip icon={<LocalOffer />} label={offers[activeBanner].title} color="secondary" />
        </Stack>
        <Box sx={{ mt: 2, p: 2, borderRadius: 3, bgcolor: offers[activeBanner].color }}>
          <Typography fontWeight={700}>{offers[activeBanner].title}</Typography>
          <Typography color="text.secondary">{offers[activeBanner].subtitle}</Typography>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ borderRadius: 4, p: { xs: 2, md: 3 }, mb: 3, bgcolor: '#ffffff' }}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
              <Typography variant="h6" fontWeight={700}>Best Sellers</Typography>
              <Select value={sortBy} onChange={(event) => setSortBy(event.target.value)} size="small" sx={{ minWidth: 140 }}>
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {visibleProducts.slice(0, 4).map((product) => (
                <Grid item xs={12} sm={6} key={product.id}>
                  <ProductCard product={product} onAdd={addToCart} onOpen={(id) => navigate(`/product/${id}`)} onWishlist={toggleWishlist} isWishlisted={wishlist.some((item) => item.id === product.id)} />
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Paper elevation={0} sx={{ borderRadius: 4, p: { xs: 2, md: 3 }, bgcolor: '#ffffff' }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Recommended for you</Typography>
            <Grid container spacing={2}>
              {productsList.slice(0, 4).map((product) => (
                <Grid item xs={12} sm={6} key={`recommended-${product.id}`}>
                  <ProductCard product={product} onAdd={addToCart} onOpen={(id) => navigate(`/product/${id}`)} onWishlist={toggleWishlist} isWishlisted={wishlist.some((item) => item.id === product.id)} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff', mb: 3 }}>
            <Typography variant="h6" fontWeight={700}>Search</Typography>
            <Paper component="form" elevation={0} sx={{ mt: 2, border: 1, borderColor: 'divider', borderRadius: 3, display: 'flex', alignItems: 'center', px: 1.5, py: 0.5 }}>
              <Search color="action" />
              <InputBase value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search milk, eggs, paneer" sx={{ ml: 1, flex: 1 }} />
            </Paper>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Live search suggestions update instantly as you type.</Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              {productsList.filter((product) => product.name.toLowerCase().includes((searchTerm || 'milk').toLowerCase())).slice(0, 4).map((product) => (
                <Box key={product.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 1.5 }}>
                  <Typography fontWeight={700}>{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{product.brand} • {product.unit}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
            <Typography variant="h6" fontWeight={700}>Recently viewed</Typography>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              {productsList.slice(1, 4).map((product) => (
                <Stack key={product.id} direction="row" alignItems="center" spacing={1.5}>
                  <Avatar src={product.image} variant="rounded" sx={{ width: 48, height: 48 }} />
                  <Box>
                    <Typography fontWeight={700}>{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{formatCurrency(product.price)}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

function ProductDetailPage({ productsList, addToCart, navigate, wishlist, toggleWishlist }) {
  const { id } = useParams();
  const product = productsList.find((item) => item.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={7}>
        <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {product.images.map((image, index) => (
              <Box key={image} component="img" src={image} alt={product.name} onClick={() => setActiveImage(index)} sx={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 2, border: activeImage === index ? 2 : 1, borderColor: activeImage === index ? 'primary.main' : 'divider', cursor: 'pointer' }} />
            ))}
          </Stack>
          <Box component="img" src={product.images[activeImage]} alt={product.name} sx={{ width: '100%', borderRadius: 4, height: 360, objectFit: 'cover' }} />
          <Typography variant="h4" fontWeight={700} sx={{ mt: 3 }}>{product.name}</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>{product.description}</Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
            <Star sx={{ color: '#ffb300' }} />
            <Typography fontWeight={700}>{product.rating}</Typography>
            <Typography color="text.secondary">{product.reviews} reviews</Typography>
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={700}>Ingredients</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>{product.ingredients}</Typography>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={700}>Nutrition</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>{product.nutrition}</Typography>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={700}>Reviews</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>“Great quality, fresh delivery, and excellent packaging.”</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff', position: 'sticky', top: 90 }}>
          <Typography variant="subtitle2" color="text.secondary">{product.brand}</Typography>
          <Typography variant="h5" fontWeight={700}>{product.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{product.unit}</Typography>
          <Typography color="success.main" sx={{ mt: 1 }}>{product.stock}</Typography>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <Typography variant="h4" fontWeight={700}>{formatCurrency(product.price)}</Typography>
            <Chip label={`${product.discount}% OFF`} color="secondary" />
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</Button>
            <Typography sx={{ minWidth: 24, textAlign: 'center', pt: 1 }}>{quantity}</Typography>
            <Button variant="outlined" onClick={() => setQuantity((value) => value + 1)}>+</Button>
          </Stack>
          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => addToCart(product, quantity)}>Add to Cart</Button>
          <Button fullWidth variant="outlined" sx={{ mt: 1.5 }} onClick={() => navigate('/checkout')}>Buy Now</Button>
          <Button fullWidth variant="text" sx={{ mt: 1.5 }} onClick={() => toggleWishlist(product)}>{wishlist.some((item) => item.id === product.id) ? 'Remove from wishlist' : 'Add to wishlist'}</Button>
          <Divider sx={{ my: 3 }} />
          <Typography variant="subtitle1" fontWeight={700}>Similar Products</Typography>
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {productsList.slice(0, 3).map((item) => (
              <Stack key={item.id} direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography fontWeight={700}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.unit}</Typography>
                </Box>
                <Button size="small" onClick={() => navigate(`/product/${item.id}`)}>View</Button>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

function CartPage({ cartItems, updateQuantity, removeFromCart, subtotal, deliveryCharge, gst, total, navigate, coupon, setCoupon, applyCoupon }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
          <Typography variant="h5" fontWeight={700}>Cart</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>Milk, eggs, bananas and more are ready for checkout.</Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {cartItems.length === 0 ? (
              <Typography color="text.secondary">Your cart is empty. Add a few essentials.</Typography>
            ) : (
              cartItems.map((item) => (
                <Box key={item.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 3, p: 2 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={1}>
                    <Box>
                      <Typography fontWeight={700}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{item.unit}</Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton size="small" onClick={() => updateQuantity(item.id, -1)}><Remove /></IconButton>
                      <Typography fontWeight={700}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => updateQuantity(item.id, 1)}><Add /></IconButton>
                      <IconButton size="small" onClick={() => removeFromCart(item.id)}><Delete /></IconButton>
                    </Stack>
                    <Typography fontWeight={700}>{formatCurrency(item.price * item.quantity)}</Typography>
                  </Stack>
                </Box>
              ))
            )}
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
          <Typography variant="h6" fontWeight={700}>Order summary</Typography>
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            <Stack direction="row" justifyContent="space-between"><Typography>Items</Typography><Typography>{formatCurrency(subtotal)}</Typography></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography>Coupon</Typography><Typography color="success.main">{coupon ? '- ₹20' : 'None'}</Typography></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography>Delivery charge</Typography><Typography>{formatCurrency(deliveryCharge)}</Typography></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography>GST</Typography><Typography>{formatCurrency(gst)}</Typography></Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between"><Typography fontWeight={700}>Total</Typography><Typography fontWeight={700}>{formatCurrency(total)}</Typography></Stack>
          </Stack>
          <TextField fullWidth label="Coupon code" value={coupon} onChange={(event) => setCoupon(event.target.value)} sx={{ mt: 2 }} />
          <Button fullWidth variant="outlined" sx={{ mt: 1.5 }} onClick={applyCoupon}>Apply coupon</Button>
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/checkout')}>Proceed to checkout</Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

function CheckoutPage({ cartItems, subtotal, deliveryCharge, gst, total, navigate, selectedAddress, setSelectedAddress, slot, setSlot, paymentMethod, setPaymentMethod, placeOrder }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
          <Typography variant="h5" fontWeight={700}>Checkout</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>Choose your delivery details and pay securely.</Typography>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={700}>Address</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ mt: 2 }}>
            {['Home', 'Office', 'Friend'].map((address) => (
              <Button key={address} variant={selectedAddress === address ? 'contained' : 'outlined'} onClick={() => setSelectedAddress(address)}>{address}</Button>
            ))}
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={700}>Delivery slot</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ mt: 2 }}>
            {['Today, 6-8 PM', 'Tomorrow, 9-11 AM', 'Tomorrow, 6-8 PM'].map((option) => (
              <Button key={option} variant={slot === option ? 'contained' : 'outlined'} onClick={() => setSlot(option)}>{option}</Button>
            ))}
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={700}>Payment method</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ mt: 2 }}>
            {['UPI', 'Card', 'COD', 'Wallet'].map((method) => (
              <Button key={method} variant={paymentMethod === method ? 'contained' : 'outlined'} startIcon={<CreditCard />} onClick={() => setPaymentMethod(method)}>{method}</Button>
            ))}
          </Stack>
          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => placeOrder()}>Place your order</Button>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
          <Typography variant="h6" fontWeight={700}>Delivery summary</Typography>
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {cartItems.map((item) => (
              <Stack key={item.id} direction="row" justifyContent="space-between"><Typography>{item.name} × {item.quantity}</Typography><Typography>{formatCurrency(item.price * item.quantity)}</Typography></Stack>
            ))}
            <Divider />
            <Stack direction="row" justifyContent="space-between"><Typography>Subtotal</Typography><Typography>{formatCurrency(subtotal)}</Typography></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography>Coupon</Typography><Typography color="success.main">- ₹20</Typography></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography>Delivery</Typography><Typography>{formatCurrency(deliveryCharge)}</Typography></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography>GST</Typography><Typography>{formatCurrency(gst)}</Typography></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography fontWeight={700}>Total</Typography><Typography fontWeight={700}>{formatCurrency(total)}</Typography></Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

function OrdersPage({ orders }) {
  const steps = ['Placed', 'Packed', 'Out for Delivery', 'Delivered'];
  const activeStep = 2;

  return (
    <Stack spacing={2}>
      {orders.map((order) => (
        <Paper key={order.id} elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
          <Typography variant="h5" fontWeight={700}>Order #{order.id}</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>{order.status}</Typography>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
            {steps.map((label) => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>
          <Typography sx={{ mt: 2 }}>Items: {order.items.join(', ')}</Typography>
        </Paper>
      ))}
    </Stack>
  );
}

function WishlistPage({ wishlist, navigate, addToCart, removeFromWishlist }) {
  return (
    <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
      <Typography variant="h5" fontWeight={700}>Wishlist</Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {wishlist.length === 0 ? <Typography color="text.secondary">Your wishlist is empty.</Typography> : wishlist.map((product) => (
          <Stack key={product.id} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={1} sx={{ border: 1, borderColor: 'divider', borderRadius: 3, p: 2 }}>
            <Box>
              <Typography fontWeight={700}>{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">{product.unit}</Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={() => addToCart(product, 1)}>Move to Cart</Button>
              <Button variant="outlined" onClick={() => removeFromWishlist(product.id)}>Remove</Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

function NotificationsPage({ notifications }) {
  return (
    <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
      <Typography variant="h5" fontWeight={700}>Notifications</Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {notifications.map((item) => (
          <Box key={item.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 3, p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontWeight={700}>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">{item.time}</Typography>
            </Stack>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>{item.detail}</Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

function ProfilePage({ auth, setAuth }) {
  const [name, setName] = useState(auth?.name || 'Asha Rao');
  const [email, setEmail] = useState(auth?.email || 'asha@example.com');

  const saveProfile = () => {
    setAuth((current) => ({ ...(current || { name: 'Asha Rao', email: 'asha@example.com', role: 'Customer' }), name, email }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const photo = reader.result;
      setAuth((current) => ({ ...(current || { name: 'Asha Rao', email: 'asha@example.com', role: 'Customer' }), photo }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
      <Typography variant="h5" fontWeight={700}>Profile</Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
          <Avatar src={auth?.photo} sx={{ width: 84, height: 84, bgcolor: 'primary.main', fontSize: 32 }}>
            {auth?.name?.charAt(0) || 'G'}
          </Avatar>
          <Button component="label" variant="outlined">
            Upload photo
            <input hidden accept="image/*" type="file" onChange={handlePhotoUpload} />
          </Button>
        </Stack>
        <TextField label="Full name" value={name} onChange={(event) => setName(event.target.value)} />
        <TextField label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <TextField label="Phone" defaultValue="9876543210" />
        <TextField label="Address" defaultValue="Hyderabad, India" />
        <Button variant="contained" onClick={saveProfile}>Save profile</Button>
      </Stack>
    </Paper>
  );
}

function AuthPage({ auth, setAuth, navigate }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleSubmit = () => {
    setAuth({ name: form.name || 'Guest User', email: form.email || 'guest@example.com', role: mode === 'login' ? 'Customer' : 'New Customer' });
    navigate('/');
  };

  return (
    <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff', maxWidth: 520, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700}>{mode === 'login' ? 'Login' : 'Register'}</Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {mode === 'register' && <TextField label="Full name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />}
        <TextField label="Email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
        <TextField label="Password" type="password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} />
        <Button variant="contained" onClick={handleSubmit}>{mode === 'login' ? 'Login' : 'Create account'}</Button>
        <Button variant="text" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}</Button>
      </Stack>
    </Paper>
  );
}

function AdminPageContent() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
          <Typography variant="h6" fontWeight={700}>Orders</Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>242</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
          <Typography variant="h6" fontWeight={700}>Products</Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>128</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
          <Typography variant="h6" fontWeight={700}>Inventory</Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>94%</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
          <Typography variant="h6" fontWeight={700}>Revenue</Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>₹3.2M</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={0} sx={{ borderRadius: 4, p: 3, bgcolor: '#ffffff' }}>
          <Typography variant="h6" fontWeight={700}>Admin Console</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>Dashboard • Orders • Products • Inventory • Users • Analytics • Coupons • Payments • Delivery Partners</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('milk');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [coupon, setCoupon] = useState('SAVE10');
  const [selectedAddress, setSelectedAddress] = useState('Home');
  const [slot, setSlot] = useState('Today, 6-8 PM');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([{ id: 25434, status: 'Out for delivery', items: ['Amul Milk', 'Fresh Bananas'] }]);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [auth, setAuth] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    const stored = window.localStorage.getItem('greenbasket-auth');
    return stored ? JSON.parse(stored) : { name: 'Asha Rao', email: 'asha@example.com', role: 'Customer' };
  });
  const [cart, setCart] = useState(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    const stored = window.localStorage.getItem('greenbasket-cart');
    return stored ? JSON.parse(stored) : [{ id: 1, quantity: 2 }, { id: 3, quantity: 1 }];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('greenbasket-auth', JSON.stringify(auth));
    }
  }, [auth]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('greenbasket-cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || `http://${host}:8081`;
        const response = await fetch(`${apiBaseUrl}/products`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setProducts(data);
          }
        }
      } catch (error) {
        console.error('Unable to load catalog from API', error);
      }
    };

    loadCatalog();
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...current, { id: product.id, quantity }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((current) => current.flatMap((item) => item.id === productId ? (item.quantity + delta > 0 ? [{ ...item, quantity: item.quantity + delta }] : []) : [item]));
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    setWishlist((current) => current.some((item) => item.id === product.id) ? current.filter((item) => item.id !== product.id) : [...current, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((current) => current.filter((item) => item.id !== productId));
  };

  const applyCoupon = () => {
    setNotifications((current) => [{ id: Date.now(), title: 'Coupon applied', detail: `${coupon} applied to your order`, time: 'Just now' }, ...current]);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      return;
    }
    const items = cartItems.map((item) => `${item.name} x${item.quantity}`).join(', ');
    setOrders((current) => [{ id: 25435 + current.length, status: 'Placed', items }, ...current]);
    setCart([]);
    navigate('/orders');
  };

  const cartItems = useMemo(() => {
    return cart.map((item) => ({ ...products.find((product) => product.id === item.id), quantity: item.quantity })).filter(Boolean);
  }, [cart, products]);

  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const deliveryCharge = subtotal > 0 ? 40 : 0;
  const gst = subtotal * 0.12;
  const total = subtotal + deliveryCharge + gst - (coupon === 'SAVE10' ? 20 : 0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f6f7fb' }}>
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'rgba(255,255,255,0.95)' }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ py: 1.5 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Button component={Link} to="/" sx={{ color: 'text.primary', fontSize: 22, fontWeight: 800, textTransform: 'none', p: 0 }}>
                GreenBasket
              </Button>
              <Paper elevation={0} sx={{ px: 1.5, py: 0.75, borderRadius: 999, bgcolor: '#f6f7fb', display: 'flex', alignItems: 'center' }}>
                <LocationOn color="primary" fontSize="small" />
                <Typography variant="body2" sx={{ ml: 0.6 }}>Hyderabad</Typography>
              </Paper>
            </Stack>
            <Paper elevation={0} sx={{ flex: 1, maxWidth: 560, border: 1, borderColor: 'divider', borderRadius: 999, px: 1.5, display: 'flex', alignItems: 'center' }}>
              <Search color="action" />
              <InputBase value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search milk, eggs, bread" sx={{ ml: 1, flex: 1 }} />
            </Paper>
            <Stack direction="row" spacing={1} alignItems="center">
              <Button component={Link} to="/wishlist">Wishlist</Button>
              <Button component={Link} to="/notifications" startIcon={<Notifications />}>Alerts</Button>
              <Button component={Link} to="/orders">Orders</Button>
              <Button component={Link} to="/admin">Admin</Button>
              <Button component={Link} to="/cart" startIcon={<ShoppingCart />}>
                Cart
                <Badge badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)} color="secondary" sx={{ ml: 1 }} />
              </Button>
              <Button component={Link} to={auth ? '/profile' : '/auth'} sx={{ borderRadius: 999, px: 1.2, py: 0.8, color: 'text.primary' }}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Avatar src={auth?.photo} sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                    {auth?.name?.charAt(0) || 'G'}
                  </Avatar>
                  <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'left' }}>
                    <Typography variant="body2" fontWeight={700}>{auth?.name || 'Guest'}</Typography>
                    <Typography variant="caption" color="text.secondary">{auth?.email || 'View profile'}</Typography>
                  </Box>
                </Stack>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage productsList={products} searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} addToCart={addToCart} navigate={navigate} wishlist={wishlist} toggleWishlist={toggleWishlist} sortBy={sortBy} setSortBy={setSortBy} />} />
          <Route path="/product/:id" element={<ProductDetailPage productsList={products} addToCart={addToCart} navigate={navigate} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} subtotal={subtotal} deliveryCharge={deliveryCharge} gst={gst} total={total} navigate={navigate} coupon={coupon} setCoupon={setCoupon} applyCoupon={applyCoupon} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} subtotal={subtotal} deliveryCharge={deliveryCharge} gst={gst} total={total} navigate={navigate} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} slot={slot} setSlot={setSlot} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} placeOrder={placeOrder} />} />
          <Route path="/orders" element={<OrdersPage orders={orders} />} />
          <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} navigate={navigate} addToCart={addToCart} removeFromWishlist={removeFromWishlist} />} />
          <Route path="/notifications" element={<NotificationsPage notifications={notifications} />} />
          <Route path="/profile" element={<ProfilePage auth={auth} setAuth={setAuth} />} />
          <Route path="/auth" element={<AuthPage auth={auth} setAuth={setAuth} navigate={navigate} />} />
          <Route path="/admin" element={<AdminPageContent />} />
        </Routes>
      </Container>
    </Box>
  );
}
