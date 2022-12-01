package com.leo.rest.controllers;

import java.util.List;

import com.leo.rest.models.Orders;
import com.leo.rest.models.RazorPay;
import com.leo.rest.models.Response;
import com.leo.rest.repositories.OrderRepository;
import com.razorpay.Order;
import com.razorpay.OrderClient;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/order")
@RestController
public class orderController {

    @Autowired
    private OrderRepository orderRepository;

    private RazorpayClient client;
	
	/**
	 * add your secretId and secretValue you got from your RazorPay account.
	 */
	private static final String SECRET_ID = "rzp_test_6lF4BIPebmfLkI";
	private static final String SECRET_KEY = "JJuH18GxlFTyA9btM3sYSI9v";
	
	public orderController() throws RazorpayException {
		this.client =  new RazorpayClient(SECRET_ID, SECRET_KEY); 
	}
	
    @GetMapping(value = "/all")
    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping(value = "/{email}")
    public List<Orders> getOrdersByEmail(@PathVariable String email) {
        return orderRepository.getByemail(email);
    }
	
	@PostMapping(value = "/{price}")
	public String createOrderId(@PathVariable String price ) {
		try {
            System.out.println(price);
			Order order = createRazorPayOrder(price); 
            System.out.println("RAZORPAYYYY ORDER_ID   :   " + order.get("id"));

            return order.get("id").toString();
		} catch (RazorpayException e) {
            return "oops...";
		}
	}
	
	
	private Order createRazorPayOrder(String amount) throws RazorpayException {
		
		JSONObject options = new JSONObject();

		options.put("amount", amount);
		options.put("currency", "INR");
		options.put("receipt", "txn_123456"); 
		return client.Orders.create(options);
	}

    @PutMapping
    public Orders createOrder(@RequestBody Orders order) throws RazorpayException {

        JSONObject options = new JSONObject();

        options.put("razorpay_order_id", order.getOrder_id());
        options.put("razorpay_payment_id", order.getPayment_id());
        options.put("razorpay_signature", order.getSignature());
        
        if (Utils.verifyPaymentSignature(options, SECRET_KEY)) return orderRepository.save(order);

        else return orderRepository.save(order);
    }

    @DeleteMapping
    public Boolean deleteOrder() {
        orderRepository.deleteAll();
        return true;
    }
}
