package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseExercises {
    private int calories;
    private String name;
    private String linkImage;
    private float stars;
    private int time;
    private String exerciseId;
}
