package com.example.DoAn1.support_service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.DoAn1.Model.Value12;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.user_history.UserHistory;
import com.example.DoAn1.entities.user_history.UserHistoryId;
import com.example.DoAn1.exception.ExceptionCode;
import com.example.DoAn1.exception.ExceptionUser;
import com.example.DoAn1.mapper.UserMapper;
import com.example.DoAn1.repository.UserHistoryRepository;
import com.example.DoAn1.repository.UserRepository;
import com.example.DoAn1.request.UserInfoUpdateRequest;
import com.example.DoAn1.response.response_user_info.ResponseUserInfo;
import com.example.DoAn1.utils.UtilsHandleJwtToken;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SupportUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    @Autowired
    private UserMapper userMapper;

    @Value("${jwt.time}")
    private int jwtTime;

    public boolean checkUserExist(String email) {
        User user = this.userRepository.getUserByEmail(email);
        if (user == null) {
            return true; // email exist
        } else {
            throw new ExceptionUser(ExceptionCode.EmailExistInDatabase);
        }
    }

    public void sendJwtToClient(String JwtToken, HttpServletResponse httpServletResponse) {
        setCookie("jwtToken", JwtToken, httpServletResponse);
    }

    public void setCookie(String nameCookie, String valueCookie, HttpServletResponse httpServletResponse) {
        Cookie cookie = new Cookie(nameCookie, valueCookie);
        cookie.setHttpOnly(false); // it is used to access cookie from client
        cookie.setSecure(false); // Ensure the cookie is only sent over HTTPS
        cookie.setMaxAge(jwtTime);
        cookie.setPath("/"); // Cookie will be available to the entire application
        httpServletResponse.addCookie(cookie);
    }

    // support of support
    public String getCookie(HttpServletRequest req, String nameCk) {
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println(cookie.getName() + ": " + cookie.getValue());
                if (nameCk.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        throw new ExceptionUser(ExceptionCode.NotFoundJwtInCookie);
    }

    public User getUserFromId(String userId) {
        Optional optional = this.userRepository.findById(userId);
        return (User) optional.get();
    }

    public User getUserFromToken(String token) {
        String userId = this.utilsHandleJwtToken.verifyToken(token);
        User user = getUserFromId(userId);
        return user;
    }

    public void create7UserHistoryWhenSignUp(User user) {
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date); // Set current date to the calendar
        Date nextDate = calendar.getTime();
        UserHistory userHistory = this.userMapper.createUserHistoryFromUser(user, nextDate);
        this.userHistoryRepository.save(userHistory);

        for (int i = 0; i < 6; i++) {
            calendar.add(Calendar.DAY_OF_YEAR, 1); // Add one day
            Date nextDate1 = calendar.getTime();
            UserHistory userHistory1 = this.userMapper.createUserHistoryFromUser(user, nextDate1);
            this.userHistoryRepository.save(userHistory1);

        }
    }

    public void checkToCreate7DateInUserHistory(User user) {
        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        UserHistoryId userHistoryId = UserHistoryId.builder()
                .day(localDate.getDayOfMonth())
                .month(localDate.getMonthValue())
                .year(localDate.getYear())
                .userId(user.getUserId())
                .build();
        Optional<UserHistory> optional = this.userHistoryRepository.findById(userHistoryId);
        if (optional.isEmpty()) {
            System.out.println("nguyentandung");
            create7UserHistoryWhenSignUp(user);
        }
    }

    public Value12 createBloodPressure(int flagBloodPressure) {
        Value12 value12 = new Value12();
        if (flagBloodPressure == 1) {
            setValue(value12, 90, 70);
        } else if (flagBloodPressure == 2) {
            setValue(value12, (float) 124.5, 70);
        } else if (flagBloodPressure == 3) {
            setValue(value12, (float) 134.5, (float) 84.5);
        } else if (flagBloodPressure == 4) {
            setValue(value12, (float) 150, (float) 100);
        } else {
            setValue(value12, (float) 190, (float) 130);
        }
        return value12;
    }

    public Value12 createBloodGluco(int flagBloodGluco) {
        Value12 value12 = new Value12();
        if (flagBloodGluco == 1) {
            setValue(value12, 90, 130);
        } else if (flagBloodGluco == 2) {
            setValue(value12, (float) 112.5, (float) 169.5);
        } else {
            setValue(value12, (float) 136, (float) 210);
        }
        return value12;
    }

    public float createHeartRate(int flagHeartRate) {
        float value = 0;
        if (flagHeartRate == 1) {
            value = 50;
        } else if (flagHeartRate == 2) {
            value = 80;
        } else {
            value = 110;
        }
        return value;
    }

    public void setValue(Value12 value12, float value1, float value2) {
        value12.setValue1(value1);
        value12.setValue2(value2);
    }

    public void updateUser(User user, UserInfoUpdateRequest userInfoUpdateRequest) {
        user.setGentle(userInfoUpdateRequest.getGender());
        user.setDob(userInfoUpdateRequest.getDob());
        user.setHeight(userInfoUpdateRequest.getHeight());
        user.setWeight(userInfoUpdateRequest.getWeight());
        // blood pressure
        user.setBloodPressure(createBloodPressure(userInfoUpdateRequest.getFlagBloodPressure()).getValue1());
        user.setBloodPressure1(createBloodPressure(userInfoUpdateRequest.getFlagBloodPressure()).getValue2());
        // heart rate
        user.setHearBeat(createHeartRate(userInfoUpdateRequest.getFlagHeartBeat()));
        // gluco
        user.setBloodSugar(createBloodGluco(userInfoUpdateRequest.getFlagGluco()).getValue1());
        user.setBloodSugar1(createBloodGluco(userInfoUpdateRequest.getFlagGluco()).getValue2());
        // he so hoat dong
        user.setHeSoHoatDong(userInfoUpdateRequest.getHeSoHoatDong());

        // save
        this.userRepository.save(user);
    }

    public void updateUserHistory(User user, UserInfoUpdateRequest userInfoUpdateRequest) {
        // get current Date
        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int value = localDate.getDayOfMonth() + localDate.getMonthValue() * 10 + localDate.getYear() * 100;
        // get list user history
        List<UserHistory> list = this.userHistoryRepository.getListUserHistory(value, user.getUserId());
        // iterate and update user history
        for (int i = 0; i < list.size(); i++) {
            update1UserHistory(list.get(i), userInfoUpdateRequest, user);
        }
    }

    public void update1UserHistory(UserHistory userHistory, UserInfoUpdateRequest userInfoUpdateRequest, User user) {
        userHistory.setHeight(userInfoUpdateRequest.getHeight());
        userHistory.setWeight(userInfoUpdateRequest.getWeight());
        // blood pressure
        userHistory.setBloodPressure(createBloodPressure(userInfoUpdateRequest.getFlagBloodPressure()).getValue1());
        userHistory.setBloodPressure1(createBloodPressure(userInfoUpdateRequest.getFlagBloodPressure()).getValue2());
        // heart rate
        userHistory.setHearBeat(createHeartRate(userInfoUpdateRequest.getFlagHeartBeat()));
        // gluco
        userHistory.setBloodSugar(createBloodGluco(userInfoUpdateRequest.getFlagGluco()).getValue1());
        userHistory.setBloodSugar1(createBloodGluco(userInfoUpdateRequest.getFlagGluco()).getValue2());
        // he so hoat dong
        userHistory.setHeSoHoatDong(userInfoUpdateRequest.getHeSoHoatDong());
        // update total calories fat carb protein
        updateTotalCalories_Fat_Carb_Protetin(userHistory, user);
        // save
        this.userHistoryRepository.save(userHistory);
    }

    public void updateTotalCalories_Fat_Carb_Protetin(UserHistory userHistory, User user) {
        // caculate BMR
        float BMR = 0;
        Date date = user.getDob();
        LocalDate localDate1 = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        if (user.getGentle().equals("Female")) {
            BMR = (float) (447.6 + (9.2 * user.getWeight()) + (3.1 * user.getHeight())
                    - (4.3 * (LocalDate.now().getYear() - localDate1.getYear())));
        } else if (user.getGentle().equals("Male")) {
            BMR = (float) (88.36 + (13.4 * user.getWeight()) + (4.8 * user.getHeight())
                    - (5.7 * (LocalDate.now().getYear() - localDate1.getYear())));
        } else {
            BMR = (float) (267.98 + (11.3 * user.getWeight()) + (3.95 * user.getHeight())
                    - (5 * (LocalDate.now().getYear() - localDate1.getYear())));
        }
        //
        float totalCalories = BMR * userHistory.getHeSoHoatDong();
        userHistory.setTotalCalories(totalCalories);
        userHistory.setTotalFat(totalCalories * 30 / 900);
        userHistory.setTotalCarb(totalCalories * 50 / 400);
        userHistory.setTotalProtein(totalCalories * 20 / 400);
    }

    public void updateUserDietInUserHistory(User user, int flagDiet) {
        // get current Date
        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int value = localDate.getDayOfMonth() + localDate.getMonthValue() * 10 + localDate.getYear() * 100;
        // get list user history
        List<UserHistory> list = this.userHistoryRepository.getListUserHistory(value, user.getUserId());
        for (int i = 0; i < list.size(); i++) {
            // update
            updateTotal(list.get(i), flagDiet);
            // save
            this.userHistoryRepository.save(list.get(i));
        }
    }

    public void updateTotal(UserHistory userHistory, int flagDiet) {
        float totalCalories = userHistory.getTotalCalories();
        userHistory.setFlagDiet(flagDiet);
        if (flagDiet == 1) {
            userHistory.setTotalCarb(totalCalories * 30 / 400);
            userHistory.setTotalFat(totalCalories * 30 / 900);
            userHistory.setTotalProtein(totalCalories * 40 / 400);
        } else if (flagDiet == 2) {
            userHistory.setTotalCarb(totalCalories * 50 / 400);
            userHistory.setTotalFat(totalCalories * 30 / 900);
            userHistory.setTotalProtein(totalCalories * 20 / 400);
        } else {
            userHistory.setTotalCarb(totalCalories * 20 / 400);
            userHistory.setTotalFat(totalCalories * 30 / 900);
            userHistory.setTotalProtein(totalCalories * 50 / 400);
        }
    }

}
