package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseFoodInMeal {
    private String name;
    private float fat;
    private float carb;
    private float protein;
    private float calories;
    private float weight;
    private int flagSystem; // 1 - system, 2 - user
}
