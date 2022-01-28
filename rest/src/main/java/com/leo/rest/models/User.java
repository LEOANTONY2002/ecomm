package com.leo.rest.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

@Document(collection = "user")
public class User {

    @Id
    private String _id;
    @JsonProperty(value = "name")
    private String name;
    @JsonProperty(value = "email")
    private String email;
    @JsonProperty(value = "password")
    private String password;
    @JsonProperty(value = "image")
    private String image;
    private String createdAt;

    public User(String _id, String name, String email, String password, String image, String createdAt) {
        super();

        Date crtAt = new Date();
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.image = image;
        this.createdAt = crtAt.toString();
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
