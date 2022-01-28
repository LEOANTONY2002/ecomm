package com.leo.rest.controllers;


import com.leo.rest.models.User;
import com.leo.rest.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/user")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = "/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping(value = "/signup")
    public Object signup(@RequestBody User user) {
        boolean u = userRepository.checkEmail(user.getEmail());
        if (u) return false;
        else return userRepository.insert(user);
    }

    @PostMapping(value = "/login")
    public Object login(@RequestBody User user) {

        if (userRepository.checkEmail(user.getEmail())) {
            User u = userRepository.getUserByEmail(user.getEmail(), user.getPassword());
            if (u == null) return "p";
            else return u;
        }
        else return "u";
    }

    @PostMapping(value = "/update")
    public User update(@RequestBody User user) {
        return userRepository.save(user);
    }
}
