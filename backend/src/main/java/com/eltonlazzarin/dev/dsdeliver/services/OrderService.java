package com.eltonlazzarin.dev.dsdeliver.services;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eltonlazzarin.dev.dsdeliver.dto.OrderDTO;
import com.eltonlazzarin.dev.dsdeliver.dto.ProductDTO;
import com.eltonlazzarin.dev.dsdeliver.entities.Order;
import com.eltonlazzarin.dev.dsdeliver.entities.OrderStatus;
import com.eltonlazzarin.dev.dsdeliver.entities.Product;
import com.eltonlazzarin.dev.dsdeliver.repositories.OrderRepository;
import com.eltonlazzarin.dev.dsdeliver.repositories.ProductRepository;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository repository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Transactional(readOnly = true)
	public List<OrderDTO> finAll() {
		List<Order> list = repository.findOrderWithProducts();
		return list.stream().map(item -> new OrderDTO(item)).collect(Collectors.toList());
	}
	
	@Transactional
	public OrderDTO insert(OrderDTO dto) {
		Order order = new Order(null, dto.getAddress(), dto.getLatitude(), dto.getLongitude(), Instant.now(), OrderStatus.PENDING);
		
		for (ProductDTO prod : dto.getProducts()) {
			Product product = productRepository.getOne(prod.getId());
			order.getProducts().add(product);
		}
		
		order = repository.save(order);
		return new OrderDTO(order);
	}
	
	@Transactional
	public OrderDTO setDelivered(Long id) { 
		Order order = repository.getOne(id);
		order.setStatus(OrderStatus.DELIVERED);
		order = repository.save(order);
		return new OrderDTO(order);
	}
}
