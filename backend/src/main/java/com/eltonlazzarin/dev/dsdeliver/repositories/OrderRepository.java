package com.eltonlazzarin.dev.dsdeliver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eltonlazzarin.dev.dsdeliver.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
