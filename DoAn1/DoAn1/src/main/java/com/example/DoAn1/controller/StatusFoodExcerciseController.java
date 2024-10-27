package com.example.DoAn1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DoAn1.repository.StatusFoodExcerciseRepository;

@RestController
@RequestMapping("/statusFoodExcercise")
public class StatusFoodExcerciseController {
    @Autowired
    private StatusFoodExcerciseRepository statusFoodExcerciseRepository;

    @GetMapping("/getAll")
    public ResponseEntity getAll() {
        return ResponseEntity.ok().body(this.statusFoodExcerciseRepository.findAll());
    }
}
