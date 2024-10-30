package com.example.DoAn1.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequestDeleteFoodInMeal {
    private String name;
    private float calories;
    private float protein;
    private float fat;
    private float carb;
    private float weight;
    private int flagSystem;
    private int flagMeal;
}
