package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

import com.example.DoAn1.Model.SavedFood;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseNutritionProfile {
    // total
    private Float totalCalories;
    private Float totalFat;
    private Float totalCarb;
    private Float totalProtein;
    // current
    private Float currentCalories;
    private Float currentFat;
    private Float currentCarb;
    private Float currentProtein;
    // diet
    private int diet;
    // list
    private List<SavedFood> listFoodInMorning;
    private List<SavedFood> listFoodInLunch;
    private List<SavedFood> listFoodInAfternoon;
    private List<SavedFood> listFoodInExtra;
}
