package com.eltonlazzarin.dev.dsdeliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eltonlazzarin.dev.dsdeliver.dto.ProductDTO;
import com.eltonlazzarin.dev.dsdeliver.entities.Product;
import com.eltonlazzarin.dev.dsdeliver.repositories.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Transactional(readOnly = true)
	public List<ProductDTO> finAll() {
		List<Product> list = repository.findAllByOrderByNameAsc();
		return list.stream().map(item -> new ProductDTO(item)).collect(Collectors.toList());
	}
}
