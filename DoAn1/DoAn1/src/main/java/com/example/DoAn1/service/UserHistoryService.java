package com.example.DoAn1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DoAn1.Model.DayMonthYear;
import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.user_history.UserHistory;
import com.example.DoAn1.entities.user_history.UserHistoryId;
import com.example.DoAn1.repository.ExerciseRepository;
import com.example.DoAn1.repository.UserHistoryRepository;
import com.example.DoAn1.repository.UserRepository;
import com.example.DoAn1.response.ResponseCode;
import com.example.DoAn1.support_service.SupportUserHistoryService;
import com.example.DoAn1.support_service.SupportUserService;
import com.example.DoAn1.utils.UtilsHandleJwtToken;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Date;

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
}
