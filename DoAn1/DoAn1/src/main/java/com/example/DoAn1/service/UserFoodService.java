package com.example.DoAn1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DoAn1.entities.user_food.UserFood;
import com.example.DoAn1.entities.user_food.UserFoodId;
import com.example.DoAn1.exception.ExceptionCode;
import com.example.DoAn1.exception.ExceptionUser;
import com.example.DoAn1.repository.UserFoodRepository;
import com.example.DoAn1.request.RequestUpdateUserFood;
import com.example.DoAn1.response.ResponseCode;
import com.example.DoAn1.support_service.SupportUserService;
import com.example.DoAn1.utils.UtilsHandleJwtToken;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

@Service
public class UserFoodService {
    @Autowired
    private SupportUserService supportUserService;

    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private UserFoodRepository userFoodRepository;

    @Transactional
    public ResponseEntity updateUserFood(HttpServletRequest httpServletRequest,
            RequestUpdateUserFood requestUpdateUserFood) {
        // get userId
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);

        // check food name
        int checkFoodName = this.userFoodRepository.checkFoodName(userId, requestUpdateUserFood.getNewName());
        if (checkFoodName > 0) {
            throw new ExceptionUser(ExceptionCode.FoodNameIsExist);
        }

        // create user food id
        UserFoodId userFoodId = UserFoodId.builder()
                .userId(userId)
                .userFoodName(requestUpdateUserFood.getOldName())
                .build();

        // create user food
        UserFood userFood = this.userFoodRepository.findById(userFoodId).get();
        UserFood userFood2 = new UserFood(userFood.getUserFoodId(), userFood.getWeight(), userFood.getCalories(),
                userFood.getProtein(), userFood.getCarb(), userFood.getFat());
        // check new and old name
        if (requestUpdateUserFood.getNewName().equals(requestUpdateUserFood.getOldName()) == false) {
            this.userFoodRepository.delete(userFood);
            // update value
            userFood2.setCalories(requestUpdateUserFood.getCalories());
            userFood2.setCarb(requestUpdateUserFood.getCarb());
            userFood2.setFat(requestUpdateUserFood.getFat());
            userFood2.setProtein(requestUpdateUserFood.getProtein());
            userFood2.setWeight(requestUpdateUserFood.getWeight());
            userFood2.setUserFoodId(UserFoodId.builder()
                    .userId(userId)
                    .userFoodName(requestUpdateUserFood.getNewName())
                    .build());
            // save
            this.userFoodRepository.save(userFood2);
            return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.UserUpdateFood));
        }

        // update value
        userFood.setCalories(requestUpdateUserFood.getCalories());
        userFood.setCarb(requestUpdateUserFood.getCarb());
        userFood.setFat(requestUpdateUserFood.getFat());
        userFood.setProtein(requestUpdateUserFood.getProtein());
        userFood.setWeight(requestUpdateUserFood.getWeight());
        userFoodId.setUserFoodName(requestUpdateUserFood.getNewName());
        userFood.setUserFoodId(userFoodId);

        // save
        this.userFoodRepository.save(userFood);

        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.UserUpdateFood));
    }

    public ResponseEntity deleteUserFood(HttpServletRequest httpServletRequest, String foodName) {
        // get userId
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);

        // create user food id
        UserFoodId userFoodId = UserFoodId.builder()
                .userId(userId)
                .userFoodName(foodName)
                .build();
        // get user food
        UserFood userFood = this.userFoodRepository.findById(userFoodId).get();
        // delete
        this.userFoodRepository.delete(userFood);
        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.DeleteUserFood));
    }
}
