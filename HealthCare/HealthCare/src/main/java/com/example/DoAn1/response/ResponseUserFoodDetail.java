package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseUserFoodDetail {
    private String foodName;
    private float fat;
    private float protein;
    private float calories;
    private float foodWeight;
    private float carb;
    private float weight;
    private float height;
    private float walking;
    private float running;
    private float skipping;
    private float swimming;
    private float riding;
}
