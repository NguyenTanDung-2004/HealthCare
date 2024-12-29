package com.example.DoAn1.controller;

import java.text.Normalizer;
import java.util.List;
import java.util.regex.Pattern;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.DoAn1.Model.Vote;
import com.example.DoAn1.entities.Food;
import com.example.DoAn1.repository.FoodRepository;
import com.example.DoAn1.request.FoodCreationRequest;
import com.example.DoAn1.request.FoodEditRequest;
import com.example.DoAn1.request.UserCreateFoodRequest;
import com.example.DoAn1.service.FoodService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/food")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @PostMapping("/createFood")
    public ResponseEntity createFood(@RequestBody FoodCreationRequest foodCreationRequest) {
        return this.foodService.createFood(foodCreationRequest);
    }

    @PostMapping("/createImageForFood")
    public ResponseEntity createImageForFood(@RequestParam(name = "listNormalImages") MultipartFile[] listNormalImages, // image
            @RequestParam(name = "removedImage") MultipartFile removedImage,
            @RequestParam(name = "foodId") String foodId) {
        return this.foodService.createImageForFood(listNormalImages, removedImage, foodId);
    }

    // test
    @Autowired
    private FoodRepository foodRepository;

    // @GetMapping("/getAllFood")
    // public ResponseEntity getAllFood() {
    // return ResponseEntity.ok().body(this.foodRepository.findAll());
    // }

    @PostMapping("/editFood")
    public ResponseEntity editFood(@RequestBody FoodEditRequest foodEditRequest) {
        return this.foodService.editFood(foodEditRequest);
    }

    @PostMapping("/likeFood")
    public ResponseEntity likeFood(HttpServletRequest httpServletRequest, @RequestBody List<String> listFoodId) {
        return this.foodService.likeFood(httpServletRequest, listFoodId);
    }

    @GetMapping("/getAllFoodName")
    public ResponseEntity getAllFoodName() {
        return ResponseEntity.ok().body(this.foodRepository.getAllFoodName());
    }

    @GetMapping("/getFoodDetail")
    public ResponseEntity getFoodDetail(@RequestParam(name = "foodId") String foodId,
            HttpServletRequest httpServletRequest) {
        return this.foodService.getFoodDetail(foodId, httpServletRequest);
    }

    @PostMapping("/voteFood")
    public ResponseEntity voteFood(@RequestBody List<Vote> voteFood, HttpServletRequest httpServletRequest) {
        return this.foodService.voteFood(voteFood, httpServletRequest);
    }

    @PostMapping("/addFoodDescription")
    public ResponseEntity addFoodDescription(@RequestBody List<String> listDescription) {
        List<Food> list = this.foodRepository.getAllFoodSortedByName();
        for (int i = 0; i < listDescription.size(); i++) {
            list.get(i).setDescriptionFood(listDescription.get(i));
            this.foodRepository.save(list.get(i));
        }
        return ResponseEntity.ok().body("ok");
    }

    @GetMapping("/getFoods")
    public ResponseEntity getFoods(@RequestParam(name = "page") int page) {
        System.out.println(page);
        return this.foodService.getFoods(page);
    }

    @GetMapping("/getAllFoods")
    public ResponseEntity getFoods() {
        return this.foodService.getAllFood();
    }

    @GetMapping("/getFoodDetailsInSystem")
    public ResponseEntity getFoodInfoInSystem(HttpServletRequest httpServletRequest,
            @RequestParam(name = "foodId") String foodId) {
        return this.foodService.getFoodInfoInSystem(httpServletRequest, foodId);
    }

    @PostMapping("/userCreateFood")
    public ResponseEntity userCreateFood(HttpServletRequest httpServletRequest,
            @RequestBody UserCreateFoodRequest userCreateFoodRequest) {
        return this.foodService.userCreateFood(httpServletRequest, userCreateFoodRequest);
    }

    @GetMapping("/getListUserFood")
    public ResponseEntity getListUserFood(HttpServletRequest httpServletRequest) {
        return this.foodService.getListUserFood(httpServletRequest);
    }

    @PostMapping("/updateFood")
    public ResponseEntity updateFood(@RequestParam(name = "foodId") String foodId,
            @RequestBody FoodCreationRequest foodCreationRequest) {
        return this.foodService.updateFood(foodId, foodCreationRequest);
    }

    @PostMapping("/updateFoodImage")
    public ResponseEntity updateFoodImage(
            @RequestParam(name = "listNormalImages", required = false) MultipartFile[] listNormalImages, // image
            @RequestParam(name = "removedImage", required = false) MultipartFile removedImage,
            @RequestParam(name = "foodId") String foodId, @RequestParam(name = "flagList") int flagList,
            @RequestParam(name = "flagRemove") int flagRemove) {
        // 1 - update, 0 - none
        return this.foodService.updateFoodImage(listNormalImages, removedImage, foodId, flagList, flagRemove);
    }

    @PostMapping("/deleteFood")
    public ResponseEntity deleteFood(@RequestParam(name = "foodId") String foodId) {
        return this.foodService.deleteFoodId(foodId);
    }

    @GetMapping("/getFoodStatistic")
    public ResponseEntity getFoodStatistic() {
        return this.foodService.getFoodStatistic();
    }

}
