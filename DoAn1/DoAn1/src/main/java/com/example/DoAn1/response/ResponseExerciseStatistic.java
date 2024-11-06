package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseExerciseStatistic {
    private String name;
    private Integer time;
    private Float met;
    private Integer numberOfLikes;
    private Float vote;
    private String linkImage;
}
