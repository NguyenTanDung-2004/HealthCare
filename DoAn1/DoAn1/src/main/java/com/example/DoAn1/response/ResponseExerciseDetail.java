package com.example.DoAn1.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseExerciseDetail {
    private String type;
    private float stars;
    private String name;
    private int flagLiked;
    private float met;
    private int time;
    private int calories;
    private List<String> listHanChe;
    private String linkVideo;
    private List<String> linkImages;
    private List<ResponseExercises> listRelatedExercises;
}
