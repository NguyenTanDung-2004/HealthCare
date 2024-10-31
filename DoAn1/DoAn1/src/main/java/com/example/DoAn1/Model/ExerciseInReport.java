package com.example.DoAn1.Model;

import com.example.DoAn1.entities.Excercise;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseInReport {
    private String name;
    private float met;
    private float timeSet;
    private float caloriesSet;
    private float totalCalories;
    private int numberOfSets;
}
