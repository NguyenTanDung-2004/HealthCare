package com.example.DoAn1.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionGlobalHandler {
    @ExceptionHandler(value = ExceptionUser.class)
    public ResponseEntity handleExceptionUser(ExceptionUser exceptionUser) {
        return ResponseEntity.status(exceptionUser.getExceptionCode().getStatus())
                .body(ExceptionCode.jsonOfExceptionCode(exceptionUser.getExceptionCode()));
    }
}
