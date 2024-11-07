package com.example.DoAn1.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.Food;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.status_food_excercise.UserStatus_Food_Excercise;
import com.example.DoAn1.repository.ExerciseRepository;
import com.example.DoAn1.repository.FoodRepository;
import com.example.DoAn1.repository.StatusFoodExcerciseRepository;
import com.example.DoAn1.response.ResponseExercises;
import com.example.DoAn1.response.ResponseFoods;
import com.example.DoAn1.support_service.SupportExerciseService;
import com.example.DoAn1.support_service.SupportFoodService;
import com.example.DoAn1.support_service.SupportUserService;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class StatusExerciseFoodService {
    @Autowired
    private SupportUserService supportUserService;

    @Autowired
    private StatusFoodExcerciseRepository statusFoodExcerciseRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private SupportExerciseService supportExerciseService;

    @Autowired
    private SupportFoodService supportFoodService;

    public ResponseEntity getExerciseRecommendation(HttpServletRequest httpServletRequest) {
        // get user
        String token = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        User user = this.supportUserService.getUserFromToken(token);
        // get list
        List<UserStatus_Food_Excercise> list = this.statusFoodExcerciseRepository
                .getListRecommendedExercise((double) createBMI(user.getHeight(), user.getWeight()),
                        createAge(user.getDob()),
                        (double) user.getBloodPressure(),
                        (double) user.getBloodSugar(), createGender(user.getGentle()), (double) user.getHeSoHoatDong(),
                        (double) user.getHearBeat());
        List<Set<String>> convertedList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            convertedList.add(list.get(i).getExcerciseId());
        }
        // create 20 recommended exercise
        List<String> list20ExerciseId = create20Recommendation(convertedList, 2);
        // create response
        List<ResponseExercises> listResponseExercises = new ArrayList<>();
        List<Excercise> listExcercises = this.exerciseRepository.findAllById(list20ExerciseId);
        this.supportExerciseService.createListResponseExercises(listExcercises, user, listResponseExercises);
        // return
        return ResponseEntity.ok().body(listResponseExercises);
    }

    public ResponseEntity getFoodRecommendation(HttpServletRequest httpServletRequest) {
        // get user
        String token = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        User user = this.supportUserService.getUserFromToken(token);
        // get list
        List<UserStatus_Food_Excercise> list = this.statusFoodExcerciseRepository
                .getListRecommendedFood((double) createBMI(user.getHeight(), user.getWeight()),
                        createAge(user.getDob()),
                        (double) user.getBloodPressure(),
                        (double) user.getBloodSugar(), createGender(user.getGentle()), (double) user.getHeSoHoatDong(),
                        (double) user.getHearBeat());
        List<Set<String>> convertedList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            convertedList.add(list.get(i).getFoodId());
        }
        // create 20 recommended exercise
        List<String> list20FoodId = create20Recommendation(convertedList, 1);
        // create response
        List<ResponseFoods> listResponse = new ArrayList<>();
        List<Food> listFoods = this.foodRepository.findAllById(list20FoodId);
        listResponse = createListResponseFoods(listFoods);
        // return
        return ResponseEntity.ok().body(listResponse);
    }

    private List<ResponseFoods> createListResponseFoods(List<Food> listFoods) {
        List<ResponseFoods> list = new ArrayList<>();
        for (int i = 0; i < listFoods.size(); i++) {
            list.add(this.supportFoodService.createResponseFoodFromFood(listFoods.get(i)));
        }
        return list;
    }

    private float createBMI(float height, float weight) {
        return weight / ((height / 100) * (height / 100));
    }

    private int createAge(java.util.Date dob) {
        // Get the current year
        Calendar currentCalendar = Calendar.getInstance();
        int currentYear = currentCalendar.get(Calendar.YEAR);

        // Get the birth year from the dob
        Calendar dobCalendar = Calendar.getInstance();
        dobCalendar.setTime(dob);
        int birthYear = dobCalendar.get(Calendar.YEAR);

        // Calculate the age based on the difference between the current year and birth
        // year
        int age = currentYear - birthYear;

        return age;
    }

    private int createGender(String gender) {
        if (gender.equals("Female")) {
            return 0;
        } else if (gender.equals("Male")) {
            return 2;
        } else {
            return 1;
        }
    }

    private List<String> create20Recommendation(List<Set<String>> list1, int flag) { // 1 - food, 2 - exercise
        List<String> list = new ArrayList<>();
        int count = 0;
        for (int i = 0; i < list1.size(); i++) {
            for (String element : list1.get(i)) {
                if (flag == 1) {
                    Optional<Food> optional = this.foodRepository.findById(element);
                    if (optional.isPresent()) {
                        list.add(element);
                        count++;
                    }
                } else {
                    Optional<Excercise> optional = this.exerciseRepository.findById(element);
                    if (optional.isPresent()) {
                        list.add(element);
                        count++;
                    }
                }
                if (count == 20) {
                    return list;
                }
            }
            if (count == 20) {
                return list;
            }
        }
        return list;
    }
}
