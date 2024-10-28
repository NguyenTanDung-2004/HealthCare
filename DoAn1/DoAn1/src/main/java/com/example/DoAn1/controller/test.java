package com.example.DoAn1.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DoAn1.entities.Food;
import com.example.DoAn1.entities.user_history.UserHistory;
import com.example.DoAn1.entities.user_history.UserHistoryId;
import com.example.DoAn1.repository.FoodRepository;
import com.example.DoAn1.repository.UserHistoryRepository;
import com.example.DoAn1.service.UserService;
import com.example.DoAn1.utils.UtilsHandleEmail;
import com.example.DoAn1.utils.UtilsHandleJwtToken;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class test {
    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private UserService userService;

    @Autowired
    private UtilsHandleEmail utilsHandleEmail;

    @Autowired
    private FoodRepository foodRepository;

    @PostMapping("/test")
    public ResponseEntity test() {
        System.out.println("nguyentandung");
        // List<Food> list = this.foodRepository.findAll();
        return ResponseEntity.ok().body("nguyentandung");
    }

    @PostMapping("/testAuthorization")
    public String abc() {
        System.out.println("nguyentandung");
        return "nguyentandung";
    }

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    @GetMapping("/getUserHistory")
    public ResponseEntity getUserHistory() {
        return ResponseEntity.ok().body(this.userHistoryRepository.findAll());
    }

    @PostMapping("/insertFoods")
    public ResponseEntity insertFoods() {
        UserHistoryId userHistoryId = UserHistoryId.builder()
                .userId("039446d3-259a-4a72-9531-63b8149ac976")
                .day(2)
                .month(10)
                .year(2024)
                .build();
        UserHistory userHistory = this.userHistoryRepository.findById(userHistoryId).get();
        System.out.println(userHistory);
        Map<String, Integer> map = userHistory.getExercises();
        map.put("asdfasdf", 5);
        userHistory.setExercises(map);
        this.userHistoryRepository.save(userHistory);
        return ResponseEntity.ok().body("asdfasdf");
    }

}
