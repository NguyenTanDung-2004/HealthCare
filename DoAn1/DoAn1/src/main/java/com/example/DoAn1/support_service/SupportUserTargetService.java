package com.example.DoAn1.support_service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.example.DoAn1.Model.DayMonthYear;
import com.example.DoAn1.entities.user_history.UserHistory;
import com.example.DoAn1.entities.user_target.UserTarget;
import com.example.DoAn1.entities.user_target.UserTargetId;
import com.example.DoAn1.request.RequestCreateUserTarget;
import com.example.DoAn1.response.ResponseDateReport;
import com.example.DoAn1.response.response_user_target.Response1DayUserTarget;
import com.example.DoAn1.response.response_user_target.ResponseUserTargetDetails;

import java.util.List;

@Component
public class SupportUserTargetService {
    public UserTarget createUserTarget(RequestCreateUserTarget requestCreateUserTarget, String userId) {
        return UserTarget.builder()
                .userTargetId(UserTargetId.builder()
                        .start(LocalDate.now())
                        .userId(userId)
                        .build())
                .end(requestCreateUserTarget.getEnd())
                .flagIncrease(requestCreateUserTarget.getFlagIncrease())
                .weight(requestCreateUserTarget.getWeight())
                .name(requestCreateUserTarget.getName())
                .build();
    }

    public ResponseUserTargetDetails createListResponseUserTargetDetails(List<UserHistory> listUserHistories,
            float targetWeight, int numberOfDay) {
        return ResponseUserTargetDetails.builder()
                .listResponse1DayUserTargets(createListResponse1DayUserTargets(listUserHistories))
                .targetWeight((targetWeight / 7) * numberOfDay)
                .build();
    }

    public Response1DayUserTarget createResponse1DayUserTarget(UserHistory userHistory) {
        return Response1DayUserTarget.builder()
                // calories
                .totalCalories(userHistory.getTotalCalories())
                .currentCalories(userHistory.getCurrentCalories())
                .currentBurned(userHistory.getCurrentBurned())
                // fat
                .totalFat(userHistory.getTotalFat())
                .currentFat(userHistory.getCurrentFat())
                // protein
                .totalProtein(userHistory.getTotalProtein())
                .currentProtein(userHistory.getTotalProtein())
                // carb
                .totalCarb(userHistory.getTotalCarb())
                .currentCarb(userHistory.getCurrentCarb())
                // date
                .dayMonthYear(new DayMonthYear(userHistory.getUserHistoryId().getDay(),
                        userHistory.getUserHistoryId().getMonth(), userHistory.getUserHistoryId().getYear()))
                .build();
    }

    public List<Response1DayUserTarget> createListResponse1DayUserTargets(List<UserHistory> listUserHistories) {
        List<Response1DayUserTarget> listResponse1DayUserTargets = new ArrayList<>();
        for (int i = 0; i < listUserHistories.size(); i++) {
            listResponse1DayUserTargets.add(createResponse1DayUserTarget(listUserHistories.get(i)));
        }
        return listResponse1DayUserTargets;
    }
}
