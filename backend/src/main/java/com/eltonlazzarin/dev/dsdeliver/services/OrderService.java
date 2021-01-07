package com.eltonlazzarin.dev.dsdeliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eltonlazzarin.dev.dsdeliver.dto.OrderDTO;
import com.eltonlazzarin.dev.dsdeliver.entities.Order;
import com.eltonlazzarin.dev.dsdeliver.repositories.OrderRepository;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository repository;
	
	@Transactional(readOnly = true)
	public List<OrderDTO> finAll() {
		List<Order> list = repository.findOrderWithProducts();
		return list.stream().map(item -> new OrderDTO(item)).collect(Collectors.toList());
	}
}
