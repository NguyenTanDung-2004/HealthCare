package com.example.DoAn1.service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DoAn1.Model.Vote;
import com.example.DoAn1.entities.Food;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.status_food_excercise.StatusFoodExcerciseId;
import com.example.DoAn1.entities.status_food_excercise.UserStatus_Food_Excercise;
import com.example.DoAn1.mapper.FoodMapper;
import com.example.DoAn1.repository.FoodRepository;
import com.example.DoAn1.repository.StatusFoodExcerciseRepository;
import com.example.DoAn1.repository.UserRepository;
import com.example.DoAn1.request.FoodCreationRequest;
import com.example.DoAn1.request.FoodEditRequest;
import com.example.DoAn1.response.ResponseCode;
import com.example.DoAn1.response.ResponseFoodDetail;
import com.example.DoAn1.response.ResponseFoods;
import com.example.DoAn1.support_service.SupportFoodService;
import com.example.DoAn1.support_service.SupportUserService;
import com.example.DoAn1.utils.UtilsHandleJwtToken;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class FoodService {
    @Autowired
    private FoodMapper foodMapper;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private SupportFoodService supportFoodService;

    @Autowired
    private SupportUserService supportUserService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private StatusFoodExcerciseRepository statusFoodExcerciseRepository;

    public ResponseEntity<Map<String, Object>> createFood(FoodCreationRequest foodCreationRequest) {

        Food food = this.foodMapper.convertRequest(foodCreationRequest);
        this.foodRepository.save(food);
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.CreateFoodSuccessfully));
    }

    public ResponseEntity editFood(FoodEditRequest foodEditRequest) {
        Food food = this.foodRepository.findById(foodEditRequest.getFoodId()).get();
        // update
        this.supportFoodService.updateFood(foodEditRequest, food);
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.UpdateFood));
    }

    public ResponseEntity likeFood(HttpServletRequest httpServletRequest, List<String> listFoodId) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        // create status_food_excercise id
        StatusFoodExcerciseId id = this.supportFoodService.createStatusFoodExcerciseId(user);
        // get Row UserStatus_Food_Excercise by user status
        Optional<UserStatus_Food_Excercise> opt = this.statusFoodExcerciseRepository.findById(id);
        UserStatus_Food_Excercise status_Food_Excercise = null;
        if (opt.isEmpty() == true) {
            status_Food_Excercise = new UserStatus_Food_Excercise();
            status_Food_Excercise.setStatusFoodExcerciseId(id);
            status_Food_Excercise.setFoodId(new HashSet<>());
            status_Food_Excercise.setExcerciseId(new HashSet<>());
        } else {
            status_Food_Excercise = opt.get();
        }
        // add food Id into user_liked_food
        this.supportFoodService.addListFoodIdToUserLikedFood(user, listFoodId);
        // add foodId into UserStatus_Food_Excercise
        this.supportFoodService.addListFoodIdToStatusFoodExcercise(status_Food_Excercise, listFoodId);
        // increase number of likes
        this.supportFoodService.increaseNumberOfLikes(listFoodId);

        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.LikeFood));
    }

    public ResponseEntity getFoodDetail(String foodId, HttpServletRequest httpServletRequest) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        // get food by Id
        Food food = this.foodRepository.findById(foodId).get();
        // create response food detail
        ResponseFoodDetail responseFoodDetail = this.supportFoodService.createFoodDetail(food, user);

        return ResponseEntity.ok().body(responseFoodDetail);
    }

    public ResponseEntity voteFood(List<Vote> foodId, HttpServletRequest httpServletRequest) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        this.supportFoodService.insertVoteFood(foodId, user);

        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.VoteFood));
    }

    public ResponseEntity getFoods(int page) {
        // get foods
        List<ResponseFoods> listResponseFoods = this.supportFoodService.createResponseFoodBasedOnPage(page);
        return ResponseEntity.ok().body(listResponseFoods);
    }

    public ResponseEntity getAllFood() {
        List<ResponseFoods> listResponseFoods = this.supportFoodService.createResponseAllFood();
        return ResponseEntity.ok().body(listResponseFoods);
    }

}
