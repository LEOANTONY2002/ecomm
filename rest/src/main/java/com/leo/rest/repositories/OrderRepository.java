package com.leo.rest.repositories;

import java.util.List;

import com.leo.rest.models.Orders;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface OrderRepository extends MongoRepository<Orders, String> {
    @Query("{email: ?0}")
    public List<Orders> getByemail(String email);
}
