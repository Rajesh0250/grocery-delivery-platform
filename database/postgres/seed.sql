TRUNCATE TABLE notifications, coupons, payments, order_items, orders, cart_items, carts, addresses, inventory, products, categories, users, roles RESTART IDENTITY CASCADE;

INSERT INTO roles (name) VALUES ('ADMIN'), ('CUSTOMER');

INSERT INTO users (username, password_hash, email, full_name, role_id) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin@greenbasket.com', 'Admin Green', 1),
('alice', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'alice@example.com', 'Alice Johnson', 2);

INSERT INTO categories (name, slug) VALUES
('Fresh Produce', 'fresh-produce'),
('Bakery', 'bakery'),
('Pantry', 'pantry'),
('Beverages', 'beverages'),
('Dairy', 'dairy'),
('Personal Care', 'personal-care'),
('Baby Care', 'baby-care'),
('Cleaning Supplies', 'cleaning-supplies');

INSERT INTO products (name, description, price, category_id, image_url, brand, discount, stock)
SELECT
  CASE (g - 1) % 20
    WHEN 0 THEN 'Amul Milk'
    WHEN 1 THEN 'Mother Dairy Paneer'
    WHEN 2 THEN 'Fresh Bananas'
    WHEN 3 THEN 'Farm Eggs'
    WHEN 4 THEN 'Coca-Cola 1.25L'
    WHEN 5 THEN 'Saffola Oats'
    WHEN 6 THEN 'Dettol Surface Cleaner'
    WHEN 7 THEN 'Pampers Baby Diapers'
    WHEN 8 THEN 'Red Apples'
    WHEN 9 THEN 'Spinach Bunch'
    WHEN 10 THEN 'Tomato Ketchup'
    WHEN 11 THEN 'Whole Grain Bread'
    WHEN 12 THEN 'Pepsi 500ml'
    WHEN 13 THEN 'Nestle Milk Chocolate'
    WHEN 14 THEN 'Bru Coffee'
    WHEN 15 THEN 'Basmati Rice'
    WHEN 16 THEN 'Aroma Handwash'
    WHEN 17 THEN 'Nandini Yogurt'
    WHEN 18 THEN 'Aavin Butter'
    ELSE 'Organic Carrots'
  END AS name,
  CASE (g - 1) % 20
    WHEN 0 THEN 'Creamy and rich whole milk ideal for tea, coffee, and breakfast bowls.'
    WHEN 1 THEN 'Soft paneer cubes for curries, wraps, and quick snacks.'
    WHEN 2 THEN 'Naturally sweet bananas perfect for breakfast and smoothies.'
    WHEN 3 THEN 'Protein-rich farm eggs for omelettes, baking, and breakfast.'
    WHEN 4 THEN 'Classic fizzy cola for lunch boxes and parties.'
    WHEN 5 THEN 'Wholesome oats for breakfast and healthy snacking.'
    WHEN 6 THEN 'Powerful cleaner for kitchen and bathroom surfaces.'
    WHEN 7 THEN 'Gentle absorbent diapers for babies with long-lasting comfort.'
    WHEN 8 THEN 'Crunchy sweet apples picked at the peak of freshness.'
    WHEN 9 THEN 'Fresh green spinach for curries, salads, and smoothies.'
    WHEN 10 THEN 'Classic ketchup for burgers, fries, and sandwiches.'
    WHEN 11 THEN 'Soft artisan bread baked daily for breakfast tables.'
    WHEN 12 THEN 'Chilled fizzy bottle for quick refreshment.'
    WHEN 13 THEN 'Silky milk chocolate for desserts and gifting.'
    WHEN 14 THEN 'Rich aroma coffee for your morning brew.'
    WHEN 15 THEN 'Fragrant basmati rice for everyday meals.'
    WHEN 16 THEN 'Gentle handwash for daily hygiene.'
    WHEN 17 THEN 'Creamy yogurt made for breakfast bowls and smoothies.'
    WHEN 18 THEN 'Fresh butter with rich spreadable texture.'
    ELSE 'Sweet and crunchy carrots ideal for salads and soups.'
  END AS description,
  ROUND(35 + ((g - 1) % 17) * 7 + ((g - 1) % 5) * 1.5, 2) AS price,
  1 + ((g - 1) % 8) AS category_id,
  CASE (g - 1) % 20
    WHEN 0 THEN 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80'
    WHEN 1 THEN 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&w=800&q=80'
    WHEN 2 THEN 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80'
    WHEN 3 THEN 'https://images.unsplash.com/photo-1518569656558-1f25e0d0d30f?auto=format&fit=crop&w=800&q=80'
    WHEN 4 THEN 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
    WHEN 5 THEN 'https://images.unsplash.com/photo-1514000337598-7f5f2f9d4f3f?auto=format&fit=crop&w=800&q=80'
    WHEN 6 THEN 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
    WHEN 7 THEN 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80'
    WHEN 8 THEN 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80'
    WHEN 9 THEN 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80'
    WHEN 10 THEN 'https://images.unsplash.com/photo-1547592166-23acddd6807c?auto=format&fit=crop&w=800&q=80'
    WHEN 11 THEN 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    WHEN 12 THEN 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
    WHEN 13 THEN 'https://images.unsplash.com/photo-1606312619070-d48b4c7e7d7d?auto=format&fit=crop&w=800&q=80'
    WHEN 14 THEN 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
    WHEN 15 THEN 'https://images.unsplash.com/photo-1586201375761-83865001e4f2?auto=format&fit=crop&w=800&q=80'
    WHEN 16 THEN 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=800&q=80'
    WHEN 17 THEN 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80'
    WHEN 18 THEN 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80'
    ELSE 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80'
  END AS image_url,
  CASE (g - 1) % 20
    WHEN 0 THEN 'Amul'
    WHEN 1 THEN 'Mother Dairy'
    WHEN 2 THEN 'Fresho'
    WHEN 3 THEN 'Eggs & Co'
    WHEN 4 THEN 'Coca-Cola'
    WHEN 5 THEN 'Saffola'
    WHEN 6 THEN 'Dettol'
    WHEN 7 THEN 'Pampers'
    WHEN 8 THEN 'FreshFarm'
    WHEN 9 THEN 'GreenLeaf'
    WHEN 10 THEN 'Heinz'
    WHEN 11 THEN 'The Bakery Co'
    WHEN 12 THEN 'Pepsi'
    WHEN 13 THEN 'Nestle'
    WHEN 14 THEN 'Bru'
    WHEN 15 THEN 'MTR'
    WHEN 16 THEN 'Aroma'
    WHEN 17 THEN 'Nandini'
    WHEN 18 THEN 'Aavin'
    ELSE 'FarmFresh'
  END AS brand,
  ROUND((g % 10) * 2.5, 2) AS discount,
  80 + (g % 25) AS stock
FROM generate_series(1, 120) AS g;

INSERT INTO inventory (product_id, stock, reserved) VALUES
(1, 120, 10),
(2, 90, 5),
(3, 60, 3),
(4, 70, 2);

INSERT INTO addresses (user_id, line1, city, postcode, is_default) VALUES
(2, '142 Market Street', 'Hyderabad', '500001', TRUE);

INSERT INTO carts (user_id) VALUES (2);

INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 3, 1);

INSERT INTO orders (user_id, status, total) VALUES
(2, 'DELIVERED', 8.27);

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 2, 2.49),
(1, 3, 1, 3.29);

INSERT INTO payments (order_id, amount, method, status) VALUES
(1, 8.27, 'CARD', 'SUCCESS');

INSERT INTO coupons (code, discount_percent) VALUES
('SAVE10', 10);

INSERT INTO notifications (user_id, message) VALUES
(2, 'Your order has been delivered successfully.');
