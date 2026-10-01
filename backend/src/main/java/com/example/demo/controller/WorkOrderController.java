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

import com.example.demo.entity.WorkOrder;
import com.example.demo.repository.WorkOrderRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class WorkOrderController {

    private final WorkOrderRepository workOrderRepository;

    public WorkOrderController(WorkOrderRepository workOrderRepository) {
        this.workOrderRepository = workOrderRepository;
    }

    @GetMapping("/workorders")
    public List<WorkOrder> getAllWorkOrders() {
        return workOrderRepository.findAll();
    }

    @PostMapping("/workorders")
    public WorkOrder addWorkOrder(@RequestBody WorkOrder workOrder) {
        return workOrderRepository.save(workOrder);
    }

    @PutMapping("/workorders/{id}")
    public WorkOrder updateWorkOrder(
            @PathVariable int id,
            @RequestBody WorkOrder workOrder) {

        workOrder.setId(id);
        return workOrderRepository.save(workOrder);
    }

    @DeleteMapping("/workorders/{id}")
    public String deleteWorkOrder(@PathVariable int id) {
        workOrderRepository.deleteById(id);
        return "Work Order deleted successfully";
    }
}