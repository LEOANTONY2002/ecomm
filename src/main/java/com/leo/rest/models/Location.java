package com.leo.rest.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "location")
public class Location {
    @Id
    private String _id;
    @JsonProperty(value = "username")
    private String username;
    @JsonProperty(value = "email")
    private String email;
    @JsonProperty(value = "address")
    private String address;
    @JsonProperty(value = "city")
    private String city;
    @JsonProperty(value = "state")
    private String state;
    @JsonProperty(value = "country")
    private String country;
    @JsonProperty(value = "pin")
    private String pin;
    @JsonProperty(value = "phone")
    private String phone;
    private String createdAt;

    public Location (String _id, String username, String email, String address, String city, String state, String country, String pin, String phone, String createdAt) {
        super();
        Date crtAt = new Date();
        
        this._id = _id;
        this.username = username;
        this.email = email;
        this.address = address;
        this.city = city;
        this.state = state;
        this.country = country;
        this.pin = pin;
        this.phone = phone;
        this.createdAt = crtAt.toString();
    }

    public String get_id() {
        return _id;
    }
    public void set_id(String _id) {
        this._id = _id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }
    public String getPin() {
        return pin;
    }
    public void setPin(String pin) {
        this.pin = pin;
    
    }public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
