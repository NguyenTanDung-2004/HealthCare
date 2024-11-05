package com.example.DoAn1.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestCreateExerciseChallenge {
    private String exerciseId;
    private int point;
}
