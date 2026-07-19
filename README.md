# GreenBasket Enterprise Grocery Delivery Platform

GreenBasket is a production-oriented quick-commerce grocery delivery platform inspired by modern delivery apps. The project combines a React storefront, Spring Boot backend services, PostgreSQL persistence, Redis caching, RabbitMQ messaging, and containerized deployment tooling.

## What is included

This repository now includes a complete reference architecture for a real grocery delivery experience with the following capabilities:

- User authentication and session handling
- Product catalog, search, recommendations, and filtering
- Cart, checkout, payment simulation, and order tracking
- Admin-facing dashboard views for orders, inventory, and operations
- PostgreSQL-backed schema with realistic seed data
- Docker Compose setup for local development and deployment

## Core platform features

### User Authentication

The platform supports:

- Registration
- Login and logout
- JWT-style session handling
- Role-based access for customers and admins
- Password and account flows for future extension

### User Profile

Users can manage:

- Profile details
- Delivery addresses
- Saved preferences and profile context
- Order history and account activity

### Home Page

The storefront includes:

- Search bar
- Delivery location selection
- Offer banners
- Product categories
- Best sellers
- Recommended products
- Recently viewed items

### Search and Discovery

Search supports:

- Keyword-based product lookup
- Live search suggestions
- Category-aware browsing
- Product discovery from the catalog

### Product Experience

Each product view can showcase:

- Product image
- Description
- Price and discount
- Stock information
- Ratings and reviews
- Similar product suggestions

### Cart and Checkout

The cart flow includes:

- Quantity updates
- Cart summary
- Coupon-style discount handling
- Delivery charges and GST estimate
- Checkout progression

### Orders and Fulfillment

The order experience includes:

- Order placement
- Order summary
- Delivery tracking state
- Admin-friendly flow visibility

### Admin Dashboard

The admin experience covers:

- Orders
- Inventory
- Products
- Payments
- Customer and operations summary views

## Architecture

The project is organized as follows:

- frontend/: React + Material UI storefront
- backend/services/auth-service/: Spring Boot service exposing catalog and commerce APIs
- database/postgres/: PostgreSQL schema and sample data
- docker-compose.yml: local container orchestration for PostgreSQL, Redis, RabbitMQ, auth service, and frontend
- deploy/: Kubernetes and Helm deployment assets

## Technology stack

- Frontend: React, Vite, Material UI, React Router
- Backend: Spring Boot, Java, REST APIs
- Database: PostgreSQL
- Messaging/Cache: Redis and RabbitMQ
- Deployment: Docker Compose, Kubernetes, Helm

## Quick start

1. Start the infrastructure services:
   - docker compose up -d postgres redis rabbitmq
2. Start the application services:
   - docker compose up -d auth-service frontend
3. Open the app in your browser:
   - http://localhost:3000

## API endpoints

The current backend exposes:

- GET /products
- GET /categories
- GET /offers
- GET /products/search
- POST /cart
- POST /checkout
- POST /payment
- POST /login
- POST /register
- GET /orders
- PUT /inventory
- GET /recommendations
- GET /health

## Database

The PostgreSQL schema includes core commerce entities such as:

- users
- roles
- categories
- products
- inventory
- addresses
- carts
- cart_items
- orders
- order_items
- payments
- coupons
- notifications

The seed data includes a larger catalog of realistic grocery products with image URLs and pricing.

## Next steps

The project is structured to be extended into a much larger enterprise platform by adding:

- full JWT-based authentication
- persistent user sessions and refresh tokens
- richer admin analytics and inventory workflows
- actual payment gateway integration
- notification pipelines for SMS and email
- dedicated microservices for catalog, cart, orders, and search

## Notes

This repository is intended as a strong foundation for a real-world grocery delivery platform and is designed to be expanded module by module rather than remain a simple prototype.
