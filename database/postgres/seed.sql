INSERT INTO roles (name) VALUES ('ADMIN'), ('CUSTOMER');

INSERT INTO users (username, password_hash, email, full_name, role_id) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin@greenbasket.com', 'Admin Green', 1),
('alice', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'alice@example.com', 'Alice Johnson', 2);

INSERT INTO categories (name, slug) VALUES
('Fresh Produce', 'fresh-produce'),
('Bakery', 'bakery'),
('Pantry', 'pantry'),
('Beverages', 'beverages');

INSERT INTO products (name, description, price, category_id, image_url) VALUES
('Organic Bananas', 'Sweet ripe bananas from local farms', 2.49, 1, 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80'),
('Free Range Eggs', 'Farm-fresh carton of eggs', 4.99, 1, 'https://images.unsplash.com/photo-1518569656558-1f25e0d0d30f?auto=format&fit=crop&w=600&q=80'),
('Whole Grain Bread', 'Soft and crusty artisan bread', 3.29, 2, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'),
('Almond Milk', 'Unsweetened almond milk', 3.89, 4, 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80');

INSERT INTO inventory (product_id, stock, reserved) VALUES
(1, 120, 10),
(2, 90, 5),
(3, 60, 3),
(4, 70, 2);

INSERT INTO addresses (user_id, line1, city, postcode, is_default) VALUES
(2, '142 Market Street', 'Seattle', '98101', TRUE);

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
