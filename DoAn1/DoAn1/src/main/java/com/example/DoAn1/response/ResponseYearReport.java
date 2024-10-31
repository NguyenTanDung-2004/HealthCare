package com.example.DoAn1.response;

import com.example.DoAn1.Model.ExerciseInReport;
import com.example.DoAn1.Model.SavedFood;
import com.example.DoAn1.Model.year_report.CaloriesChart;
import com.example.DoAn1.Model.year_report.ExerciseChart;
import com.example.DoAn1.Model.year_report.FatCarbProteinChart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseYearReport {
    /// exercise
    private List<ExerciseChart> exerciseChart;
    private List<List<ExerciseInReport>> listExercises;
    // calories
    private List<CaloriesChart> caloriesChart;
    private List<List<SavedFood>> listSavedFoodsCalories;
    // fat carb protein
    private List<FatCarbProteinChart> fatCarbProteinChart;
    private List<List<SavedFood>> listSavedFoodFat;
    private List<List<SavedFood>> listSavedFoodCarb;
    private List<List<SavedFood>> listSavedFoodProtein;
}
