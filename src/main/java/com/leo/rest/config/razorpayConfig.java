package com.leo.rest.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


@Component
@ConfigurationProperties(prefix = "razorpay")
public class razorpayConfig {
    private String key;
    private String secret;
}
