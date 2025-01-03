package com.example.DoAn1.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionCode {

    TokenCreationError(1001, "create token fail", HttpStatus.BAD_REQUEST),
    VerificationTokenError(1001, "verify token fail", HttpStatus.BAD_REQUEST),
    EmailExistInDatabase(1001, "email is exist in database", HttpStatus.BAD_REQUEST),
    NotFoundJwtInCookie(1001, "not found jwt in cookie", HttpStatus.BAD_REQUEST),
    EmailIsNotExits(1001, "email is not exits", HttpStatus.BAD_GATEWAY),
    SendEmailFail(1001, "send email fail", HttpStatus.BAD_GATEWAY),
    CodeWrong(1001, "code wrong", HttpStatus.BAD_REQUEST),
    PasswordWrong(1001, "password wrong", HttpStatus.BAD_REQUEST),
    FoodNameIsExist(1001, "Food Name is exist", HttpStatus.BAD_REQUEST),
    ExerciseNameIsExist(1001, "Food Name is exist", HttpStatus.BAD_REQUEST);

    private int code;
    private String message;
    private HttpStatusCode status;

    public static Map<String, Object> jsonOfExceptionCode(ExceptionCode exceptionCode) {
        Map<String, Object> map = new HashMap<>();
        map.put("code", exceptionCode.getCode());
        map.put("message", exceptionCode.getMessage());
        return map;
    }
}
