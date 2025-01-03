package com.example.DoAn1.response;

import java.util.List;

import com.example.DoAn1.Model.ExerciseInReport;
import com.example.DoAn1.Model.SavedFood;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDateReport {
    // calories
    private Float totalCalories;
    private Float currentCalories;
    private Float currentBurned;
    // fat
    private Float totalFat;
    private Float currentFat;
    // protein
    private Float totalProtein;
    private Float currentProtein;
    // carb
    private Float totalCarb;
    private Float currentCarb;
    // list exercise
    private List<ExerciseInReport> listExerciseInReport;
    // list food
    private List<SavedFood> listSavedFoods;
}
