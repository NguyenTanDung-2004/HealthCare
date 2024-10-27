package com.example.DoAn1.response;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public enum ResponseCode {

    CreateAccountSuccessfully(1000, "create account successfully!"),
    CompleteAccountSuccessfully(1000, "complete account successfully!"),
    SendEmailSuccessfully(1000, "send email successfully!"),
    UpdatePasswordSuccessfully(1000, "update password successfully!"),
    LoginSuccessfully(1000, "login successfully!"),
    CreateFoodSuccessfully(1000, "create food successfully!"),
    AddExercise(1000, "Add exercise successfully!"),
    UpdateUserInfo(1000, "update user successfully!"),
    UpdateFood(1000, "update food successfully!"),
    LikeFood(1000, "Like food successfully!"),
    VoteFood(1000, "vote food successfully!"),
    UpdateUserDiet(1000, "update user diet successfully!");

    private int code;
    private String message;

    public static Map<String, Object> jsonOfResponseCode(ResponseCode responseCode) {
        Map map = new HashMap<>();
        map.put("code", responseCode.getCode());
        map.put("message", responseCode.getMessage());
        return map;
    }

}
