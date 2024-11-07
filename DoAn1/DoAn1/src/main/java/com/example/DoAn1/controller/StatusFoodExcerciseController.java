package com.example.DoAn1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DoAn1.repository.StatusFoodExcerciseRepository;
import com.example.DoAn1.service.StatusExerciseFoodService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/statusFoodExcercise")
public class StatusFoodExcerciseController {
    @Autowired
    private StatusFoodExcerciseRepository statusFoodExcerciseRepository;

    @Autowired
    private StatusExerciseFoodService statusExerciseFoodService;

    @GetMapping("/getAll")
    public ResponseEntity getAll() {
        return ResponseEntity.ok().body(this.statusFoodExcerciseRepository.findAll());
    }

    @GetMapping("/getExerciseRecommendation")
    public ResponseEntity getExerciseRecommendation(HttpServletRequest httpServletRequest) {
        return statusExerciseFoodService.getExerciseRecommendation(httpServletRequest);
    }

    @GetMapping("/getFoodRecommendation")
    public ResponseEntity getFoodRecommendation(HttpServletRequest httpServletRequest) {
        return statusExerciseFoodService.getFoodRecommendation(httpServletRequest);
    }
}

// function in sql
// DELIMITER //

// CREATE FUNCTION cosine_similarity(
// bmi1 DOUBLE, age1 INT, bloodPressure1 DOUBLE, bloodSugar1 DOUBLE,
// gender1 INT, heSoHoatDOng1 DOUBLE, heartBeat1 DOUBLE,
// bmi DOUBLE, age INT, blood_pressure DOUBLE, blood_sugar DOUBLE,
// gender INT, he_so_hoat_dong DOUBLE, heart_beat DOUBLE
// )
// RETURNS DOUBLE
// DETERMINISTIC
// BEGIN
// DECLARE dot_product DOUBLE;
// DECLARE magnitude_a DOUBLE;
// DECLARE magnitude_b DOUBLE;

// -- Tính tử số (tích vô hướng)
// SET dot_product = (bmi * bmi1 + age * age1 + blood_pressure * bloodPressure1
// +
// blood_sugar * bloodSugar1 + gender * gender1 +
// he_so_hoat_dong * heSoHoatDOng1 + heart_beat * heartBeat1);

// -- Tính mẫu số (độ lớn của từng vector)
// SET magnitude_a = SQRT(POW(bmi, 2) + POW(age, 2) + POW(blood_pressure, 2) +
// POW(blood_sugar, 2) + POW(gender, 2) +
// POW(he_so_hoat_dong, 2) + POW(heart_beat, 2));

// SET magnitude_b = SQRT(POW(bmi1, 2) + POW(age1, 2) + POW(bloodPressure1, 2) +
// POW(bloodSugar1, 2) + POW(gender1, 2) +
// POW(heSoHoatDOng1, 2) + POW(heartBeat1, 2));

// -- Trả về cosine similarity
// RETURN dot_product / (magnitude_a * magnitude_b);
// END //

// DELIMITER ;
