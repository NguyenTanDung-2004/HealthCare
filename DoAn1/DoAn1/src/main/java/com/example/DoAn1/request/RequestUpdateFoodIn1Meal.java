package com.example.DoAn1.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestUpdateFoodIn1Meal {
    // new
    private String newName;
    private float newFat;
    private float newCarb;
    private float newProtein;
    private float newCalories;
    private float newWeight;
    // old
    private String oldName;
    private float oldFat;
    private float oldCarb;
    private float oldProtein;
    private float oldCalories;
    private float oldWeight;
    //
    private int flagSystem;
    private int flagMeal;
}
