# GreenBasket Enterprise Grocery Delivery Platform

A modular enterprise-grade grocery delivery platform inspired by modern quick-commerce experiences, built as a clean reference architecture with React, Spring Boot microservices, PostgreSQL, Redis, RabbitMQ, Docker Compose, Kubernetes, Helm, Jenkins, and Terraform.

## Project Structure

- frontend/: React + Material UI storefront
- backend/services/: Spring Boot microservice skeletons
- database/postgres/: PostgreSQL schema and seed scripts
- deploy/kubernetes/: Kubernetes manifests
- deploy/helm/grocery-platform/: Helm chart
- Jenkinsfile: CI pipeline
- terraform/: AWS infrastructure example

## Quick Start

1. Start infrastructure:
   - docker compose up -d postgres redis rabbitmq
2. Start services:
   - docker compose up -d api-gateway auth-service user-service catalog-service inventory-service cart-service order-service payment-service frontend
3. Open http://localhost:3000

## Included Modules

- Home, search, categories, product listing, cart, checkout, order tracking, user profile, admin dashboard
- JWT auth, CRUD APIs, inventory, cart, orders, payments, notifications, Swagger-ready endpoints
- PostgreSQL schema, sample data, Docker and K8s packaging
