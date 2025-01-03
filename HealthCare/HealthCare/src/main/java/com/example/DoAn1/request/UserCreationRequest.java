package com.example.DoAn1.request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreationRequest {
    private String email;
    private String firstName;
    private String lastName;
    private Date dob; // y-m-d
    private String password;
    private String gentle;
}
