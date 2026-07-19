package com.greengrocery.auth.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class GroceryController {

    private final List<ProductCatalogItem> catalog = List.of(
        new ProductCatalogItem(1L, "Amul Milk", "Creamy and rich whole milk ideal for tea, coffee, and breakfast bowls.", 68.0, 5L, "Dairy", "Amul", 10.0, 120, "500 ml", "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80"),
        new ProductCatalogItem(2L, "Mother Dairy Paneer", "Soft paneer cubes for curries, wraps, and quick snacks.", 92.0, 5L, "Dairy", "Mother Dairy", 8.0, 90, "200 g", "https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&w=800&q=80"),
        new ProductCatalogItem(3L, "Fresh Bananas", "Naturally sweet bananas perfect for breakfast and smoothies.", 49.0, 1L, "Fruits", "Fresho", 12.0, 180, "1 kg", "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80"),
        new ProductCatalogItem(4L, "Farm Eggs", "Protein-rich farm eggs for omelettes, baking, and breakfast.", 84.0, 5L, "Dairy", "Eggs & Co", 6.0, 95, "12 count", "https://images.unsplash.com/photo-1518569656558-1f25e0d0d30f?auto=format&fit=crop&w=800&q=80"),
        new ProductCatalogItem(5L, "Coca-Cola 1.25L", "Classic fizzy cola for lunch boxes and parties.", 89.0, 4L, "Drinks", "Coca-Cola", 15.0, 75, "1.25 L", "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80"),
        new ProductCatalogItem(6L, "Saffola Oats", "Wholesome oats for breakfast and healthy snacking.", 128.0, 3L, "Snacks", "Saffola", 11.0, 64, "500 g", "https://images.unsplash.com/photo-1514000337598-7f5f2f9d4f3f?auto=format&fit=crop&w=800&q=80"),
        new ProductCatalogItem(7L, "Dettol Surface Cleaner", "Powerful cleaner for kitchen and bathroom surfaces.", 165.0, 8L, "Cleaning", "Dettol", 9.0, 102, "500 ml", "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"),
        new ProductCatalogItem(8L, "Pampers Baby Diapers", "Gentle absorbent diapers for babies with long-lasting comfort.", 599.0, 7L, "Baby Care", "Pampers", 14.0, 40, "72 count", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80")
    );

    private final List<CategoryCatalogItem> categories = List.of(
        new CategoryCatalogItem(1L, "Fruits", "fruits"),
        new CategoryCatalogItem(2L, "Vegetables", "vegetables"),
        new CategoryCatalogItem(3L, "Snacks", "snacks"),
        new CategoryCatalogItem(4L, "Drinks", "drinks"),
        new CategoryCatalogItem(5L, "Dairy", "dairy"),
        new CategoryCatalogItem(6L, "Personal Care", "personal-care"),
        new CategoryCatalogItem(7L, "Baby Care", "baby-care"),
        new CategoryCatalogItem(8L, "Cleaning", "cleaning")
    );

    private final List<OfferCatalogItem> offers = List.of(
        new OfferCatalogItem(1L, "Flat ₹50 off", "On first order above ₹250", "#e8f5e9"),
        new OfferCatalogItem(2L, "Free delivery", "Today only on essentials", "#fff3e0"),
        new OfferCatalogItem(3L, "Buy 2, get 1 free", "On selected dairy", "#f3e5f5")
    );

    @GetMapping("/products")
    public List<ProductResponse> products() {
        return catalog.stream().map(ProductResponse::from).collect(Collectors.toList());
    }

    @GetMapping("/categories")
    public List<CategoryResponse> categories() {
        return categories.stream().map(CategoryResponse::from).collect(Collectors.toList());
    }

    @GetMapping("/offers")
    public List<OfferResponse> offers() {
        return offers.stream().map(OfferResponse::from).collect(Collectors.toList());
    }

    @GetMapping("/products/search")
    public List<ProductResponse> search(@RequestParam(defaultValue = "") String keyword) {
        String normalized = keyword.toLowerCase();
        return catalog.stream()
            .filter(product -> normalized.isBlank()
                || product.name().toLowerCase().contains(normalized)
                || product.brand().toLowerCase().contains(normalized)
                || product.description().toLowerCase().contains(normalized))
            .map(ProductResponse::from)
            .collect(Collectors.toList());
    }

    @PostMapping("/cart")
    public CartSummaryResponse cart(@RequestBody CartRequest request) {
        List<CartItemResponse> items = request.items().stream().map(item -> {
            ProductCatalogItem product = catalog.stream().filter(entry -> entry.id().equals(item.productId())).findFirst().orElse(null);
            if (product == null) {
                return null;
            }
            return new CartItemResponse(product.id(), product.name(), item.quantity(), product.price(), product.imageUrl(), product.unit());
        }).filter(item -> item != null).collect(Collectors.toList());

        double subtotal = items.stream().mapToDouble(item -> item.price() * item.quantity()).sum();
        double deliveryCharge = subtotal > 0 ? 40.0 : 0.0;
        double gst = subtotal * 0.12;
        double total = subtotal + deliveryCharge + gst - 20.0;

        return new CartSummaryResponse(request.userId(), items, subtotal, deliveryCharge, gst, total);
    }

    @PostMapping("/checkout")
    public CheckoutResponse checkout(@RequestBody CheckoutRequest request) {
        double subtotal = request.items().stream().mapToDouble(item -> {
            ProductCatalogItem product = catalog.stream().filter(entry -> entry.id().equals(item.productId())).findFirst().orElse(null);
            return product == null ? 0.0 : product.price() * item.quantity();
        }).sum();
        double deliveryCharge = subtotal > 0 ? 40.0 : 0.0;
        double gst = subtotal * 0.12;
        double total = subtotal + deliveryCharge + gst - 20.0;

        return new CheckoutResponse(25434L, "PLACED", subtotal, deliveryCharge, gst, total, request.address(), request.slot(), request.paymentMethod());
    }

    @PostMapping("/payment")
    public PaymentResponse payment(@RequestBody PaymentRequest request) {
        return new PaymentResponse(request.orderId(), request.method(), request.amount(), "SUCCESS");
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        String role = "admin".equalsIgnoreCase(request.username()) || "alice".equalsIgnoreCase(request.username()) ? "CUSTOMER" : "GUEST";
        return new AuthResponse("demo-token", new UserResponse(1L, request.username(), role));
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return new AuthResponse("demo-token", new UserResponse(2L, request.username(), "CUSTOMER"));
    }

    @GetMapping("/orders")
    public List<OrderResponse> orders(@RequestParam(defaultValue = "1") Long userId) {
        return List.of(
            new OrderResponse(25434L, userId, "PLACED", "Out for delivery", 458.0, List.of(
                new OrderItemResponse(1L, "Amul Milk", 2),
                new OrderItemResponse(3L, "Fresh Bananas", 1)
            ))
        );
    }

    @PutMapping("/inventory")
    public InventoryResponse inventory(@RequestBody InventoryUpdateRequest request) {
        ProductCatalogItem product = catalog.stream().filter(entry -> entry.id().equals(request.productId())).findFirst().orElse(null);
        if (product == null) {
            throw new IllegalArgumentException("Product not found");
        }
        return new InventoryResponse(product.id(), request.stock(), product.stock() - request.stock());
    }

    @GetMapping("/recommendations")
    public List<ProductResponse> recommendations(@RequestParam(defaultValue = "1") Long userId) {
        List<ProductCatalogItem> recommendations = new ArrayList<>(catalog);
        recommendations.removeIf(product -> product.id().equals(7L));
        return recommendations.stream().limit(4).map(ProductResponse::from).collect(Collectors.toList());
    }

    public record ProductCatalogItem(Long id, String name, String description, Double price, Long categoryId, String category, String brand, Double discount, Integer stock, String unit, String imageUrl) {
    }

    public record CategoryCatalogItem(Long id, String name, String slug) {
    }

    public record OfferCatalogItem(Long id, String title, String subtitle, String color) {
    }

    public record ProductResponse(Long id, String name, String description, Double price, Long categoryId, String category, String brand, Double discount, Integer stock, String unit, String imageUrl) {
        public static ProductResponse from(ProductCatalogItem item) {
            return new ProductResponse(item.id(), item.name(), item.description(), item.price(), item.categoryId(), item.category(), item.brand(), item.discount(), item.stock(), item.unit(), item.imageUrl());
        }
    }

    public record CategoryResponse(Long id, String name, String slug) {
        public static CategoryResponse from(CategoryCatalogItem item) {
            return new CategoryResponse(item.id(), item.name(), item.slug());
        }
    }

    public record OfferResponse(Long id, String title, String subtitle, String color) {
        public static OfferResponse from(OfferCatalogItem item) {
            return new OfferResponse(item.id(), item.title(), item.subtitle(), item.color());
        }
    }

    public record CartRequest(Long userId, List<CartItemRequest> items) {
    }

    public record CartItemRequest(Long productId, Integer quantity) {
    }

    public record CartItemResponse(Long productId, String name, Integer quantity, Double price, String imageUrl, String unit) {
    }

    public record CartSummaryResponse(Long userId, List<CartItemResponse> items, Double subtotal, Double deliveryCharge, Double gst, Double total) {
    }

    public record CheckoutRequest(Long userId, String address, String slot, String paymentMethod, List<CartItemRequest> items) {
    }

    public record CheckoutResponse(Long orderId, String status, Double subtotal, Double deliveryCharge, Double gst, Double total, String address, String slot, String paymentMethod) {
    }

    public record PaymentRequest(Long orderId, String method, Double amount) {
    }

    public record PaymentResponse(Long orderId, String method, Double amount, String status) {
    }

    public record LoginRequest(String username, String password) {
    }

    public record RegisterRequest(String username, String email, String password, String fullName) {
    }

    public record AuthResponse(String token, UserResponse user) {
    }

    public record UserResponse(Long id, String username, String role) {
    }

    public record OrderResponse(Long orderId, Long userId, String status, String message, Double total, List<OrderItemResponse> items) {
    }

    public record OrderItemResponse(Long productId, String name, Integer quantity) {
    }

    public record InventoryUpdateRequest(Long productId, Integer stock) {
    }

    public record InventoryResponse(Long productId, Integer stock, Integer available) {
    }
}
