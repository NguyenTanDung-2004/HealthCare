package com.example.DoAn1.response.response_user_target;

import com.example.DoAn1.Model.DayMonthYear;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Response1DayUserTarget {
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
    // burned
    private Float currentBurned;
    // date
    private DayMonthYear dayMonthYear;
}
