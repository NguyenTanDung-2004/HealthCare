package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResponseAdminExercise {
    private String exerciseId;
    private String exerciseName;
    private float met;
    private float time;
    private String linkImage;
    private int numberOfPractices;
}
