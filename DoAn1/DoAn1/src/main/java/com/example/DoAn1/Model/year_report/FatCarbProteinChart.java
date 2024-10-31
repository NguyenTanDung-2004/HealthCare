package com.example.DoAn1.Model.year_report;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FatCarbProteinChart {
    private int day;
    // total
    private Float totalFat;
    private Float totalCarb;
    private Float totalProtein;
    // current
    private Float currentFat;
    private Float currentCarb;
    private Float currentProtein;
}
