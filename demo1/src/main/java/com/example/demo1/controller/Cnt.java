package com.example.demo1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo1.model.User;
import com.example.demo1.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Cnt {

    @Autowired
    private UserRepository ur;

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User u) {

        if (u.getName() == null || u.getEmail() == null || u.getPassword() == null ||
            u.getName().isBlank() || u.getEmail().isBlank() || u.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body("All fields are required");
        }

        if (ur.findByEmail(u.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        ur.save(u);
        return ResponseEntity.ok("Register Done");
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User u) {

        if (u.getName() == null || u.getPassword() == null ||
            u.getName().isBlank() || u.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body("Missing credentials");
        }

        User dbUser;

        // 🔍 login using email OR username
        if (u.getName().contains("@")) {
            dbUser = ur.findByEmail(u.getName());
        } else {
            dbUser = ur.findByName(u.getName());
        }

        // ❌ user not found
        if (dbUser == null) {
            return ResponseEntity.status(401).body("User not found");
        }

        // ❌ password mismatch
        if (!dbUser.getPassword().equals(u.getPassword())) {
            return ResponseEntity.status(401).body("Wrong password");
        }

        // ✅ success
        return ResponseEntity.ok("Login Successful");
    }
}
