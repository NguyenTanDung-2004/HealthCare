package com.example.DoAn1.response.response_user_info;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ResponseUserInfo {
    private String email;
    private String firstName;
    private String lastName;
    private String gender;
    private Date dob;
    private float height;
    private float weight;
    private float BMI;
    private String statusBMI;
    private int flagGluco;
    private String statusGluco;
    private int flagPressure;
    private String statusPressure;
    private int flagBeat;
    private String statusHeartBeat;
    private float heSoHoatDong;
    private float totalCalories;
    private float currentCalories;
    private float currentFat;
    private float currentProtein;
    private float currentCarb;
    private float totalFat;
    private float totalProtein;
    private float totalCarb;
    // add currentBurned
    private float currentBurned;

    // id
    private String id;

    //
    private float gluco;
    private float pressure;
    private float beat;

    private float gluco1;
    private float pressure1;

}
