package com.example.DoAn1.Model.year_report;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseChart {
    private int day;
    private Float currentBurned;
}
