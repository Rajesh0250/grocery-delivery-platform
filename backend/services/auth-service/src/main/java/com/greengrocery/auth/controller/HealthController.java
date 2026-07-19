package com.greengrocery.auth.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "auth-service-ok";
    }
}
