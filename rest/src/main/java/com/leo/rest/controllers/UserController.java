package com.leo.rest.controllers;


import com.leo.rest.models.User;
import com.leo.rest.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

@RequestMapping("/api/v1/user")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    public String base64(String password) throws NoSuchAlgorithmException, InvalidKeySpecException {
        SecureRandom secureRandom = new SecureRandom();
        
        //make sure to save this into a database
        byte[] salt = secureRandom.generateSeed(12);

        PBEKeySpec pbeKeySpec = new PBEKeySpec(password.toCharArray(), salt, 10, 512);
        SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
        byte[] hash = skf.generateSecret(pbeKeySpec).getEncoded();

        //converting to string to store into database
        String base64Hash = Base64.getMimeEncoder().encodeToString(hash);
        return base64Hash;
    }

    @GetMapping(value = "/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping(value = "/signup")
    public Object signup(@RequestBody User user) throws NoSuchAlgorithmException, InvalidKeySpecException  {
        HashMap<String, Object> map = new HashMap<>();
        boolean u = userRepository.checkEmail(user.getEmail());
        if (u) {
            map.put("status", false);
            map.put("error", "email already exists");
            return map;
        }
        else {
            // String hash = base64(user.getPassword());
            // user.setPassword(hash);
            User newUser = userRepository.insert(user);
            map.put("status", true);
            map.put("user", newUser);
            System.out.println(newUser.getPassword());
            return map;
        }
    }

    @PostMapping(value = "/login")
    public Object login(@RequestBody User user) throws NoSuchAlgorithmException, InvalidKeySpecException {
        HashMap<String, Object> map = new HashMap<>();
        // String deHash = base64(user.getPassword());
        // user.setPassword(deHash);
        System.out.println(user.getPassword());
        if (userRepository.checkEmail(user.getEmail())) {
            User u = userRepository.getUserByEmail(user.getEmail(), user.getPassword());
            if (u == null) {
                map.put("status", false);
                map.put("error", "invalid credentials");
                return map;
            }
            else {
                map.put("status", true);
                map.put("user", u);
                System.out.println(u.getPassword());
                return map;
            }
        }
        else {
            map.put("status", false);
            map.put("error", "email has not found");
            return map;
        }
    }

    @PostMapping(value = "/update")
    public User update(@RequestBody User user) {
        return userRepository.save(user);
    }

    @DeleteMapping
    public void delete() {
        userRepository.deleteAll();
    }
}
