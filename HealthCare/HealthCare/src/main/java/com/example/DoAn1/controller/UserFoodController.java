package com.example.DoAn1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.DoAn1.request.RequestUpdateUserFood;
import com.example.DoAn1.service.UserFoodService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/userFood")
public class UserFoodController {

    @Autowired
    private UserFoodService userFoodService;

    @PostMapping("/updateUserFood")
    public ResponseEntity updateUserFood(HttpServletRequest httpServletRequest,
            @RequestBody RequestUpdateUserFood requestUpdateUserFood) {
        return userFoodService.updateUserFood(httpServletRequest, requestUpdateUserFood);
    }

    @PostMapping("/deleteUserFood")
    public ResponseEntity deleteUserFood(HttpServletRequest httpServletRequest,
            @RequestParam(name = "foodName") String foodName) {
        return userFoodService.deleteUserFood(httpServletRequest, foodName);
    }

}
