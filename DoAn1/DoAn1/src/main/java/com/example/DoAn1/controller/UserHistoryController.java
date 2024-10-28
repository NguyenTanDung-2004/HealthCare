package com.example.DoAn1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.DoAn1.service.UserHistoryService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/userHistory")
public class UserHistoryController {
    @Autowired
    private UserHistoryService userHistoryService;

    @PostMapping("/recordExercise")
    public ResponseEntity recordExercise(HttpServletRequest httpServletRequest,
            @RequestParam(name = "exerciseId") String exerciseId) {
        return this.userHistoryService.recordExercise(httpServletRequest, exerciseId);
    }

    // @PostMapping("/userAddSystemFood")
    // public ResponseEntity userAddSystemFood(HttpServletRequest
    // httpServletRequest, ) {
    // return this.userHistoryService.userAddSystemFood(httpServletRequest, foodId);
    // }
}
