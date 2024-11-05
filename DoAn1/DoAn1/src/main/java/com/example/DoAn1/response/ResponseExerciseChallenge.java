package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseExerciseChallenge {
    // image
    private String linkImage;
    // old
    private int calories;
    private String name;
    private float stars;
    private int time;
    private String exerciseId;
    // add
    int numberOfPractice;
    int numberOfUsers;
}
