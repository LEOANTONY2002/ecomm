package com.leo.rest.repositories;

import com.leo.rest.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    @Query("{email : ?0}")
    List<Product> getAllUserProducts(String email);
}
