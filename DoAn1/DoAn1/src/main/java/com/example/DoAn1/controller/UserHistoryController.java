package com.example.DoAn1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.DoAn1.Model.SavedFood;
import com.example.DoAn1.request.RequestAddSystemFood;
import com.example.DoAn1.request.RequestAddUserFoodToMeal;
import com.example.DoAn1.request.RequestUpdateFoodIn1Meal;
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

    @PostMapping("/userAddSystemFood")
    public ResponseEntity userAddSystemFood(HttpServletRequest httpServletRequest,
            @RequestBody RequestAddSystemFood requestAddSystemFood) {
        return this.userHistoryService.userAddSystemFood(httpServletRequest, requestAddSystemFood);
    }

    @GetMapping("/getUserFoodInfo")
    public ResponseEntity getUserFoodInfo(HttpServletRequest httpServletRequest,
            @RequestParam(name = "foodName") String foodName) {
        return this.userHistoryService.getUserFoodInfo(httpServletRequest, foodName);

    }

    @PostMapping("/addUserFood")
    public ResponseEntity addUserFood(HttpServletRequest httpServletRequest,
            @RequestBody RequestAddUserFoodToMeal requestAddUserFoodToMeal) {
        return this.userHistoryService.addUserFood(httpServletRequest, requestAddUserFoodToMeal);
    }

    @GetMapping("/getListFoodIn1Meal")
    public ResponseEntity getListFoodIn1Meal(HttpServletRequest httpServletRequest,
            @RequestParam(name = "flagMeal") int flagMeal) {
        return this.userHistoryService.getListFoodIn1Meal(httpServletRequest, flagMeal);
    }

    // @GetMapping("/getFoodDetailIn1Meal")
    // public ResponseEntity getFoodDetailIn1Meal(HttpServletRequest
    // httpServletRequest,
    // @RequestBody SavedFood savedFood, @RequestParam(name = "flagSystem") int
    // flagSystem) {
    // return this.userHistoryService.getFoodDetailIn1Meal(httpServletRequest,
    // savedFood, flagSystem);
    // }

    @PostMapping("/updateFoodInMeal")
    public ResponseEntity updateFoodInMeal(HttpServletRequest httpServletRequest,
            @RequestBody RequestUpdateFoodIn1Meal requestUpdateFoodIn1Meal) {
        return this.userHistoryService.updateFoodInMeal(httpServletRequest, requestUpdateFoodIn1Meal);
    }
}
