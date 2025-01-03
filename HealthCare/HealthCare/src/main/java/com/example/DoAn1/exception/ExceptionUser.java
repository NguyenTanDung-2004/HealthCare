package com.example.DoAn1.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExceptionUser extends RuntimeException {

    private ExceptionCode exceptionCode;
}
