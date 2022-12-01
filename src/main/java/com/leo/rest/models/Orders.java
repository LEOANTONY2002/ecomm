package com.leo.rest.models;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.data.annotation.Id;

public class Orders {
    @Id
    private String _id;
    @JsonProperty(value = "username")
    private String username;
    @JsonProperty(value = "email")
    private String email;
    @JsonProperty(value = "products")
    private List<?> products;
    @JsonProperty(value = "price")
    private String price;
    @JsonProperty(value = "location")
    private Object location;
    @JsonProperty(value = "order_id")
    private String order_id;
    @JsonProperty(value = "payment_id")
    private String payment_id;
    @JsonProperty(value = "signature")
    private String signature;
    @JsonProperty(value = "mode")
    private String mode;
    @JsonProperty(value = "status")
    private String status;
    private String createdAt;

    public Orders(String _id, String username, String email, List<?> products, String price, Object location, String order_id, String payment_id, String signature, String mode, String status, String createdAt) {
        Date date = new Date();

        this._id = _id;
        this.username = username;
        this.email = email;
        this.products = products;
        this.price = price;
        this.location = location;
        this.order_id = order_id;
        this.payment_id = payment_id;
        this.signature = signature;
        this.mode = mode;
        this.status = status;
        this.createdAt = date.toString();
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

    public List<?> getProducts() {
        return products;
    }

    public void setProducts(List<?> products) {
        this.products = products;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Object getLocation() {
        return location;
    }

    public void setLocation(Object location) {
        this.location = location;
    }

    public String getMode() {
        return mode;
    }


    public void setMode(String mode) {
        this.mode = mode;
    }

    public String getStatus() {
        return status;
    }


    public void setStatus(String status) {
        this.status = status;
    }


    public String getCreatedAt() {
        return createdAt;
    }

    public String getOrder_id() {
        return order_id;
    }

    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }

    public String getPayment_id() {
        return payment_id;
    }

    public void setPayment_id(String payment_id) {
        this.payment_id = payment_id;
    }

    public String getSignature() {
        return signature;
    }


    public void setSignature(String signature) {
        this.signature = signature;
    }


    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    
}
