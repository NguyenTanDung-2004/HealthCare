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
public class RequestUpdateExtractUserInfo {
    private String firstName;
    private String lastName;
    private String gender;
    private Date dob;
    private float height;
    private float weight;
    private float bloodPressure;
    private float heartBeat;
    private float gluco;
    private float bloodPressure1;
    private float gluco1;
    private float heSoHoatDong;
}
