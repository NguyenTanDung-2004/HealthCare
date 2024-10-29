package com.example.DoAn1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DoAn1.Model.DayMonthYear;
import com.example.DoAn1.Model.SavedFood;
import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.Food;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.user_food.UserFood;
import com.example.DoAn1.entities.user_food.UserFoodId;
import com.example.DoAn1.entities.user_history.UserHistory;
import com.example.DoAn1.entities.user_history.UserHistoryId;
import com.example.DoAn1.repository.ExerciseRepository;
import com.example.DoAn1.repository.FoodRepository;
import com.example.DoAn1.repository.UserFoodRepository;
import com.example.DoAn1.repository.UserHistoryRepository;
import com.example.DoAn1.repository.UserRepository;
import com.example.DoAn1.request.RequestAddSystemFood;
import com.example.DoAn1.request.RequestAddUserFoodToMeal;
import com.example.DoAn1.request.RequestUpdateFoodIn1Meal;
import com.example.DoAn1.response.ResponseCode;
import com.example.DoAn1.response.ResponseFoodInMeal;
import com.example.DoAn1.response.ResponseUserFoodDetail;
import com.example.DoAn1.support_service.SupportUserHistoryService;
import com.example.DoAn1.support_service.SupportUserService;
import com.example.DoAn1.utils.UtilsHandleJwtToken;

import jakarta.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserHistoryService {
    @Autowired
    private SupportUserService supportUserService;

    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    @Autowired
    private SupportUserHistoryService supportUserHistoryService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private UserFoodRepository userFoodRepository;

    public ResponseEntity recordExercise(HttpServletRequest httpServletRequest, String exerciseId) {
        // get user id
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        // get exercise
        Excercise excercise = this.exerciseRepository.findById(exerciseId).get();
        // get userHistory
        DayMonthYear currentDayMonthYear = this.supportUserHistoryService.getCurrentDayMonthYear();
        UserHistoryId userHistoryId = new UserHistoryId(currentDayMonthYear.getDay(), currentDayMonthYear.getMonth(),
                currentDayMonthYear.getYear(), userId);
        UserHistory userHistory = this.userHistoryRepository.findById(userHistoryId).get();
        // add exercise
        this.supportUserHistoryService.addExercise(exerciseId, userHistory);
        // update current burned
        float calories = this.supportUserHistoryService.caculateCaloriesBasedOnMet(user, excercise);
        this.supportUserHistoryService.updateCurrentBurned(calories, userHistory);
        // save
        this.userHistoryRepository.save(userHistory);
        // response
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.RecordExercise));
    }

    public ResponseEntity userAddSystemFood(HttpServletRequest httpServletRequest,
            RequestAddSystemFood requestAddSystemFood) {
        // get user id
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        // get userHistory
        DayMonthYear currentDayMonthYear = this.supportUserHistoryService.getCurrentDayMonthYear();
        UserHistoryId userHistoryId = new UserHistoryId(currentDayMonthYear.getDay(), currentDayMonthYear.getMonth(),
                currentDayMonthYear.getYear(), userId);
        UserHistory userHistory = this.userHistoryRepository.findById(userHistoryId).get();
        // get food
        Food food = this.foodRepository.findById(requestAddSystemFood.getFoodId()).get();
        // update current
        this.supportUserHistoryService.updateCurrentValue(food, userHistory, requestAddSystemFood.getWeight());
        // create json string from saved food
        String savedFoodJson = this.supportUserHistoryService.createJsonStringFromSavedFood(food,
                requestAddSystemFood.getWeight(), requestAddSystemFood.getFlag());
        // update list food system
        if (userHistory.getListFoodInSystem() == null) {
            userHistory.setListFoodInSystem(new ArrayList<>());
        }
        userHistory.getListFoodInSystem().add(savedFoodJson);
        // save
        this.userHistoryRepository.save(userHistory);
        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.UserAddSystemFood));
    }

    public ResponseEntity getUserFoodInfo(HttpServletRequest httpServletRequest, String foodName) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        // get user food
        UserFoodId userFoodId = UserFoodId.builder()
                .userFoodName(foodName)
                .userId(userId)
                .build();
        // get user food
        UserFood userFood = this.userFoodRepository.findById(userFoodId).get();
        // create response
        ResponseUserFoodDetail responseUserFoodDetail = ResponseUserFoodDetail.builder()
                .foodName(foodName)
                .fat(userFood.getFat())
                .protein(userFood.getProtein())
                .calories(userFood.getCalories())
                .foodWeight(userFood.getWeight())
                .carb(userFood.getCarb())
                .weight(user.getWeight())
                .height(user.getHeight())
                .walking(4)
                .running(9)
                .skipping(8)
                .swimming(10)
                .riding(8)
                .build();
        // return
        return ResponseEntity.ok().body(responseUserFoodDetail);

    }

    public ResponseEntity addUserFood(HttpServletRequest httpServletRequest,
            RequestAddUserFoodToMeal requestAddUserFoodToMeal) {
        // get user id
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        // get user history
        // get userHistory
        DayMonthYear currentDayMonthYear = this.supportUserHistoryService.getCurrentDayMonthYear();
        UserHistoryId userHistoryId = new UserHistoryId(currentDayMonthYear.getDay(), currentDayMonthYear.getMonth(),
                currentDayMonthYear.getYear(), userId);
        UserHistory userHistory = this.userHistoryRepository.findById(userHistoryId).get();
        // get user food
        UserFoodId userFoodId = UserFoodId.builder()
                .userFoodName(requestAddUserFoodToMeal.getFoodName())
                .userId(userId)
                .build();
        UserFood userFood = this.userFoodRepository.findById(userFoodId).get();
        // update current value of user
        this.supportUserHistoryService.updateCurrentValue(userFood, userHistory, requestAddUserFoodToMeal.getWeight());
        // create saved food string
        String savedFoodJson = this.supportUserHistoryService.createJsonStringFromSavedFood(userFood,
                requestAddUserFoodToMeal.getWeight(), requestAddUserFoodToMeal.getFlag());
        // update list user food
        if (userHistory.getListUserFood() == null) {
            userHistory.setListUserFood(new ArrayList<>());
        }
        userHistory.getListUserFood().add(savedFoodJson);
        // save
        this.userHistoryRepository.save(userHistory);
        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.UserAddUserFoodToMeal));
    }

    public ResponseEntity getListFoodIn1Meal(HttpServletRequest httpServletRequest, int flagMeal) {
        // get user id
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        // get userHistory
        DayMonthYear currentDayMonthYear = this.supportUserHistoryService.getCurrentDayMonthYear();
        UserHistoryId userHistoryId = new UserHistoryId(currentDayMonthYear.getDay(), currentDayMonthYear.getMonth(),
                currentDayMonthYear.getYear(), userId);
        UserHistory userHistory = this.userHistoryRepository.findById(userHistoryId).get();
        // get list saved food json
        List<String> listSystemFoodJson = userHistory.getListFoodInSystem();
        List<String> listUserFoodJson = userHistory.getListUserFood();
        // create list response
        List<ResponseFoodInMeal> list = this.supportUserHistoryService.createListResponseFoodInMeal(listSystemFoodJson,
                listUserFoodJson, flagMeal);
        // return
        return ResponseEntity.ok().body(list);
    }

    // public ResponseEntity getFoodDetailIn1Meal(HttpServletRequest
    // httpServletRequest, SavedFood savedFood,
    // int flagSystem) {
    // // get user id
    // String jwtToken = this.supportUserService.getCookie(httpServletRequest,
    // "jwtToken");
    // String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
    // // get userHistory
    // DayMonthYear currentDayMonthYear =
    // this.supportUserHistoryService.getCurrentDayMonthYear();
    // UserHistoryId userHistoryId = new UserHistoryId(currentDayMonthYear.getDay(),
    // currentDayMonthYear.getMonth(),
    // currentDayMonthYear.getYear(), userId);
    // UserHistory userHistory =
    // this.userHistoryRepository.findById(userHistoryId).get();
    // // get list food json
    // List<String> listFoodJson = new ArrayList<>();
    // if (flagSystem == 1) {
    // listFoodJson = userHistory.getListFoodInSystem();
    // } else {
    // listFoodJson = userHistory.getListUserFood();
    // }
    // }

    public ResponseEntity updateFoodInMeal(HttpServletRequest httpServletRequest,
            RequestUpdateFoodIn1Meal requestUpdateFoodIn1Meal) {
        // get user id
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        // get userHistory
        DayMonthYear currentDayMonthYear = this.supportUserHistoryService.getCurrentDayMonthYear();
        UserHistoryId userHistoryId = new UserHistoryId(currentDayMonthYear.getDay(), currentDayMonthYear.getMonth(),
                currentDayMonthYear.getYear(), userId);
        UserHistory userHistory = this.userHistoryRepository.findById(userHistoryId).get();
        // get list json
        List<String> listFoodJson = new ArrayList<>();
        if (requestUpdateFoodIn1Meal.getFlagSystem() == 1) {
            listFoodJson = userHistory.getListFoodInSystem();
        } else {
            listFoodJson = userHistory.getListUserFood();
        }
        // update
        this.supportUserHistoryService.update(listFoodJson, requestUpdateFoodIn1Meal, userHistory);
        if (requestUpdateFoodIn1Meal.getFlagSystem() == 1) {
            userHistory.setListFoodInSystem(listFoodJson);
        } else {
            userHistory.setListUserFood(listFoodJson);
        }
        this.userHistoryRepository.save(userHistory);
        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.UserUpdateFoodInMeal));
    }
}
