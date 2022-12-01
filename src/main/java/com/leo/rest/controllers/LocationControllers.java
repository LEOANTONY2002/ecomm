package com.leo.rest.controllers;

import java.util.List;

import com.leo.rest.models.Location;
import com.leo.rest.repositories.LocationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/location")
@RestController
public class LocationControllers {
    @Autowired
    private LocationRepository locationRepository;

    @GetMapping(value = "/all")
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }
    
    @GetMapping(value = "/{email}")
    public Location getLocationByEmail(@PathVariable String email) {
        return locationRepository.findByEmail(email);
    }

    @PostMapping
    public Location createLocation(@RequestBody Location location) {
        Boolean loc = locationRepository.checkByEmail(location.getEmail());
        if (loc) return locationRepository.findByEmail(location.getEmail());
        else return locationRepository.insert(location);
    }

    @PutMapping
    public Location updateLocation(@RequestBody Location location) {
        return locationRepository.save(location);
    }

    @DeleteMapping
    public Boolean deleteLocation(@RequestBody String email) {
        List<Location> locs = locationRepository.getByEmail(email);
        locationRepository.deleteAll();
        return true;
    }
}
