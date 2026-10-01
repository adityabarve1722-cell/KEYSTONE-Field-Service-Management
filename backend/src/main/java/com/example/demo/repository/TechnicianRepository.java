package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Technician;

public interface TechnicianRepository extends JpaRepository<Technician, Integer> {

}