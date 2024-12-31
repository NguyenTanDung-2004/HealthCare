package com.example.DoAn1.request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoUpdateRequest {
    private String firstName;
    private String lastName;
    private String gender;
    private Date dob;
    private float height;
    private float weight;
    private int flagBloodPressure;
    private int flagHeartBeat;
    private int flagGluco;
    private float heSoHoatDong;
}
