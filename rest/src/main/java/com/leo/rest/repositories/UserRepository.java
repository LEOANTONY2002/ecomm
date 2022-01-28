package com.leo.rest.repositories;

import com.leo.rest.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends MongoRepository<User, Long> {

    @Query("{$and:[{email : ?0}, {password: ?1}]}")
    User getUserByEmail(String email, String password);

    @Query(value = "{email : ?0}", exists = true)
    boolean checkEmail(String email);
}
