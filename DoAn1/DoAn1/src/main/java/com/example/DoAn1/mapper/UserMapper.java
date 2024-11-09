package com.example.DoAn1.mapper;

import java.text.DateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Component;

import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.user_history.UserHistory;
import com.example.DoAn1.entities.user_history.UserHistoryId;
import com.example.DoAn1.repository.UserHistoryRepository;
import com.example.DoAn1.request.UserCompleteRequest;
import com.example.DoAn1.request.UserCreationRequest;
import com.example.DoAn1.response.response_user_info.ResponseUserInfo;
import com.example.DoAn1.utils.UtilsHandlePassword;

@Component
public class UserMapper {

    @Autowired
    private UtilsHandlePassword utilsHandlePassword;

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    public User convertRequestUserToUser(UserCreationRequest userCreationRequest, String role) {
        User user = User.builder()
                .userId(userCreationRequest.getEmail())
                .role(role)
                .email(userCreationRequest.getEmail())
                .firstName(userCreationRequest.getFirstName())
                .lastName(userCreationRequest.getLastName())
                .gentle(userCreationRequest.getGentle())
                .dob(userCreationRequest.getDob())
                .password(utilsHandlePassword.encryptPassword(userCreationRequest.getPassword()))
                .heSoHoatDong((float) 1)
                .flag(2)
                .build();
        return user;
    }

    public User mapperUserCompleteRequest(User user, UserCompleteRequest userCompleteRequest) {
        user.setHeight(userCompleteRequest.getHeight());
        user.setWeight(userCompleteRequest.getWeight());
        user.setBloodPressure(userCompleteRequest.getBloodPressureRange());
        user.setBloodSugar(userCompleteRequest.getBloodGlucoseRange());
        user.setHearBeat(userCompleteRequest.getHeartRateRange());
        user.setBloodPressure1(userCompleteRequest.getBloodPressureRange1());
        user.setBloodSugar1(userCompleteRequest.getBloodGlucoseRange1());
        return user;
    }

    private String statusGluco;
    private String statusPressure;
    private String statusHeartBeat;

    public ResponseUserInfo createResponseUserInfo(User user) {
        float BMI = createBMI(user.getHeight(), user.getWeight());

        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        UserHistoryId userHistoryId = UserHistoryId.builder()
                .day(localDate.getDayOfMonth())
                .month(localDate.getMonthValue())
                .year(localDate.getYear())
                .userId(user.getUserId())
                .build();
        Optional<UserHistory> optional = this.userHistoryRepository.findById(userHistoryId);
        UserHistory userHistory = optional.get();

        return ResponseUserInfo.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .gender(user.getGentle())
                .dob(user.getDob())
                .height(user.getHeight())
                .weight(user.getWeight())
                .BMI(BMI)
                .statusBMI(createStatusBMI(BMI))
                .flagPressure(getPressure(userHistory.getBloodPressure()))
                .statusPressure(statusPressure)
                .flagGluco(getGluco(userHistory.getBloodSugar()))
                .statusGluco(statusGluco)
                .flagBeat(getHeartRate(user.getHearBeat()))
                .statusHeartBeat(statusHeartBeat)
                .heSoHoatDong(userHistory.getHeSoHoatDong())
                .totalCalories(userHistory.getTotalCalories())
                .currentCalories(userHistory.getCurrentCalories())
                .totalFat(userHistory.getTotalFat())
                .currentFat(userHistory.getCurrentFat())
                .totalCarb(userHistory.getTotalCarb())
                .currentCarb(userHistory.getCurrentCarb())
                .totalProtein(userHistory.getTotalProtein())
                .currentProtein(userHistory.getCurrentProtein())
                .currentBurned((userHistory.getCurrentBurned() != null) ? userHistory.getCurrentBurned() : 0)
                .build();
    }

    private int getGluco(float gluco) {
        if (gluco < 99) {
            statusGluco = "Đường trong máu ít.";
            return 1;
        }
        if (gluco < 125) {
            statusGluco = "Đường trong máu bình thường.";
            return 2;
        }
        statusGluco = "Đường trong máu cao.";
        return 3;
    }

    private int getPressure(float pressure) {
        if (pressure < 99) {
            statusPressure = "Huyết áp thấp!";
            return 1;
        } else if (pressure < 129) {
            statusPressure = "Huyết áp bình thường!";
            return 2;
        } else if (pressure < 139) {
            statusPressure = "Huyết áp cao cấp 1!";
            return 3;
        } else if (pressure > 180) {
            statusPressure = "Huyết áp cao cấp 2!";
            return 5;
        } else {
            statusPressure = "Huyết áp cao cấp 3!";
            return 4;
        }
    }

    private int getHeartRate(float hearRate) {
        if (hearRate < 60) {
            statusHeartBeat = "Tim mạch rất tốt!";
            return 1;
        }
        if (hearRate < 100) {
            statusHeartBeat = "Tim mạch bình thường!";
            return 2;
        }
        statusHeartBeat = "Bệnh tim!";
        return 3;
    }

    private String createStatusBMI(float BMI) {
        if (BMI < 18.5) {
            return "Suy dinh dưỡng";
        } else if (BMI < 24.9) {
            return "Bình thường";
        } else if (BMI < 29.9) {
            return "Thừa cân";
        } else if (BMI < 34.9) {
            return "Béo phì cấp 1!";
        } else if (BMI < 39.9) {
            return "Béo phì cấp 2!";
        } else {
            return "Béo phì cấp 3!";
        }
    }

    private float createBMI(float height, float weight) {
        return weight / ((height / 100) * (height / 100));
    }

    public UserHistory createUserHistoryFromUser(User user, Date date) {
        float BMI = user.getHeight() / (user.getWeight() * user.getWeight());
        float roundedBMI = (float) (Math.round(BMI * 10) / 10.0);
        LocalDate localDate1 = user.getDob().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        float BMR = 0;
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
        float totalCalories = BMR * user.getHeSoHoatDong();

        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        System.out.println(totalCalories + " " + BMR);
        return UserHistory.builder()
                .userHistoryId(UserHistoryId.builder()
                        .day(localDate.getDayOfMonth())
                        .month(localDate.getMonthValue())
                        .year(localDate.getYear())
                        .userId(user.getUserId())
                        .build())
                .totalCalories(BMR * user.getHeSoHoatDong())
                .currentCalories((float) 0)
                .totalFat(totalCalories * 30 / 900)
                .currentFat((float) 0)
                .totalCarb(totalCalories * 50 / 400)
                .currentCarb((float) 0)
                .totalProtein(totalCalories * 20 / 400)
                .currentProtein((float) 0)
                .height(user.getHeight())
                .weight(user.getWeight())
                .bloodPressure(user.getBloodPressure())
                .hearBeat(user.getHearBeat())
                .bloodSugar(user.getBloodSugar())
                .heSoHoatDong(user.getHeSoHoatDong())
                .bloodPressure1(user.getBloodPressure1())
                .bloodSugar1(user.getBloodSugar1())
                .flagDiet(1)
                .build();
    }

}
