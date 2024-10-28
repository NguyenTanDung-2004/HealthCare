package com.example.DoAn1.support_service;

import org.springframework.stereotype.Component;

import com.example.DoAn1.Model.DayMonthYear;
import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.user_history.UserHistory;
import java.util.Map;
import java.util.Date;
import java.time.LocalDate;
import java.time.ZoneId;

@Component
public class SupportUserHistoryService {
    public void addExercise(String exerciseId, UserHistory userHistory) {
        Map<String, Integer> map = userHistory.getExercisesFromExerciseJson();
        if (map.get(exerciseId) == null) {
            map.put(exerciseId, 1);
        } else {
            map.put(exerciseId, map.get(exerciseId) + 1);
        }
        userHistory.setExerciseJsonFromExercises(map);
    }

    public DayMonthYear getCurrentDayMonthYear() {
        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return DayMonthYear.builder()
                .day(localDate.getDayOfMonth())
                .month(localDate.getMonthValue())
                .year(localDate.getYear())
                .build();
    }

    public void updateCurrentBurned(float currentBurned, UserHistory userHistory) {
        if (userHistory.getCurrentBurned() == null) {
            userHistory.setCurrentBurned(currentBurned);
        } else {
            userHistory.setCurrentBurned(userHistory.getCurrentBurned() + currentBurned);
        }
    }

    public int caculateCaloriesBasedOnMet(User user, Excercise excercise) {
        return (int) ((user.getWeight() * excercise.getMet() * excercise.getTime()) / 3600);
    }
}
