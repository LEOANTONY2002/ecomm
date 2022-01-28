package com.leo.rest.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "product")
public class Product {

    @Id
    private String _id;
    @JsonProperty(value = "username")
    private String username;
    @JsonProperty(value = "email")
    private String email;
    @JsonProperty(value = "name")
    private String name;
    @JsonProperty(value = "desc")
    private String desc;
    @JsonProperty(value = "category")
    private String category;
    @JsonProperty(value = "price")
    private String price;
    @JsonProperty(value = "stock")
    private String stock;
    @JsonProperty(value = "image")
    private String image;
    private String createdAt;

    public Product(String _id, String username, String email, String name, String desc, String category, String price, String stock, String image, String createdAt) {
        super();
        Date crtAt = new Date();

        this._id = _id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.desc = desc;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.image = image;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getStock() {
        return stock;
    }

    public void setStock(String stock) {
        this.stock = stock;
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
