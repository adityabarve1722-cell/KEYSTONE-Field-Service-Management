package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public LoginController(
            UserRepository userRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public Map<String, String> login(
            @RequestBody LoginRequest request) {

        User user = userRepository.findAll()
                .stream()
                .filter(u ->
                        u.getUsername().equals(request.getUsername())
                        && u.getPassword().equals(request.getPassword()))
                .findFirst()
                .orElse(null);

        Map<String, String> response = new HashMap<>();

        if (user == null) {
            response.put("message", "Invalid username or password");
            return response;
        }

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole()
        );

        response.put("message", "Login successful");
        response.put("username", user.getUsername());
        response.put("role", user.getRole());
        response.put("token", token);

        return response;
    }
}