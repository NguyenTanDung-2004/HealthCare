package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseFoodStatistic {
    private String name;
    private int level;
    private int method;
    private int diet;
    private double calories;
    private double carb;
    private double protein;
    private double fat;
    private double time;
    private int type;
    private int numberOfLikes;
    private float vote;
    private String linkImage;
}
