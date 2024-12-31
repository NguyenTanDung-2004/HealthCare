package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseFoods {
    private String name;
    private int type;
    private String removeImage;
    private double time;
    private double calories;
    private int numberOfLikes;
    private double stars;
    private String id;
    private int level;
    private int diet;

    private Double carb;
    private Double fat;
    private Double protein;
}
