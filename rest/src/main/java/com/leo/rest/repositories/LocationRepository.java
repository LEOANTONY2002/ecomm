package com.leo.rest.repositories;

import java.util.List;

import com.leo.rest.models.Location;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends MongoRepository<Location, String> {
    @Query("{email : ?0}")
    Location findByEmail(String email);

    @Query(value = "{email : ?0}", exists = true)
    Boolean checkByEmail(String email);

    @Query(value = "{email : ?0}")
    List<Location> getByEmail(String email);
}
