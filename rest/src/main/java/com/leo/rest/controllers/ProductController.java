package com.leo.rest.controllers;

import com.leo.rest.models.Product;
import com.leo.rest.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/product")
@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping(value = "/all")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping(value = "/user/{email}")
    public List<Product> getAllUserProducts(@PathVariable String email) {
        return productRepository.getAllUserProducts(email);
    }

    @GetMapping(value = "/{id}")
    public Optional<Product> selectProduct(@PathVariable String id) {
        return productRepository.findById(id);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping()
    public Product updateProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @DeleteMapping(value = "/{id}")
    public boolean deleteProduct(@PathVariable String id) {
        productRepository.deleteById(id);
        if (!productRepository.existsById(id)) return true;
        else return false;
    }
}
