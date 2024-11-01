package com.example.DoAn1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DoAn1.entities.user_history.UserHistory;
import com.example.DoAn1.entities.user_target.UserTarget;
import com.example.DoAn1.entities.user_target.UserTargetId;
import com.example.DoAn1.repository.UserHistoryRepository;
import com.example.DoAn1.repository.UserTargetRepository;
import com.example.DoAn1.request.RequestCreateUserTarget;
import com.example.DoAn1.response.ResponseCode;
import com.example.DoAn1.response.ResponseListUserTarget;
import com.example.DoAn1.response.response_user_target.ResponseUserTargetDetails;
import com.example.DoAn1.support_service.SupportUserService;
import com.example.DoAn1.support_service.SupportUserTargetService;
import com.example.DoAn1.utils.UtilsHandleJwtToken;

import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.Date;
import java.util.List;

@Service
public class UserTargetService {
    @Autowired
    private SupportUserService supportUserService;

    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private UserTargetRepository userTargetRepository;

    @Autowired
    private SupportUserTargetService supportUserTargetService;

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    public ResponseEntity createUserTarget(HttpServletRequest httpServletRequest,
            RequestCreateUserTarget requestCreateUserTarget) {
        // get user id
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        // create user target
        UserTarget userTarget = this.supportUserTargetService.createUserTarget(requestCreateUserTarget, userId);
        // save
        this.userTargetRepository.save(userTarget);
        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.CreateUserTarget));
    }

    public ResponseEntity getListUserTarget(HttpServletRequest httpServletRequest) {
        // get user id
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        // get list user target
        List<UserTarget> list = this.userTargetRepository.getListUserTarget(userId);
        // create flag create
        int flag = 1;
        Date date = this.userTargetRepository.getDate(userId);
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        if (localDate.getDayOfMonth() + localDate.getMonthValue() * 10
                + localDate.getYear() * 100 >= LocalDate.now().getDayOfMonth()
                        + LocalDate.now().getMonthValue() * 10 + LocalDate.now().getYear() * 10) {
            flag = 2;
        }
        // create response
        ResponseListUserTarget responseListUserTarget = ResponseListUserTarget.builder()
                .listUserTarget(list)
                .flagCreate(flag)
                .build();
        // return
        return ResponseEntity.ok().body(responseListUserTarget);
    }

    public ResponseEntity getUsertargetDetails(HttpServletRequest httpServletRequest, LocalDate start) {
        // get user id
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        // get user target
        UserTargetId userTargetId = UserTargetId.builder()
                .userId(userId)
                .start(start)
                .build();
        UserTarget userTarget = this.userTargetRepository.findById(userTargetId).get();
        // get list user history
        LocalDate localDate2 = userTarget.getEnd().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int startValue = start.getDayOfMonth() + start.getMonthValue() * 10 + start.getYear() * 100;
        int endValue = localDate2.getDayOfMonth() + localDate2.getMonthValue() * 10 + localDate2.getYear() * 100;
        List<UserHistory> listUserHistories = this.userHistoryRepository.getListUserHistory(startValue, endValue);
        // create response
        int numberOfDays = (int) ChronoUnit.DAYS.between(start, localDate2) + 2;
        ResponseUserTargetDetails responseUserTargetDetails = this.supportUserTargetService
                .createListResponseUserTargetDetails(listUserHistories, userTarget.getWeight(), numberOfDays);
        // return
        return ResponseEntity.ok().body(responseUserTargetDetails);
    }
}
