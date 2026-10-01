package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Technician;
import com.example.demo.repository.TechnicianRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TechnicianController {

    private final TechnicianRepository technicianRepository;

    public TechnicianController(TechnicianRepository technicianRepository) {
        this.technicianRepository = technicianRepository;
    }

    @GetMapping("/technicians")
    public List<Technician> getAllTechnicians() {
        return technicianRepository.findAll();
    }

    @PostMapping("/technicians")
    public Technician addTechnician(@RequestBody Technician technician) {
        return technicianRepository.save(technician);
    }

    @PutMapping("/technicians/{id}")
    public Technician updateTechnician(
            @PathVariable int id,
            @RequestBody Technician technician) {

        technician.setId(id);
        return technicianRepository.save(technician);
    }

    @DeleteMapping("/technicians/{id}")
    public String deleteTechnician(@PathVariable int id) {
        technicianRepository.deleteById(id);
        return "Technician deleted successfully";
    }
}