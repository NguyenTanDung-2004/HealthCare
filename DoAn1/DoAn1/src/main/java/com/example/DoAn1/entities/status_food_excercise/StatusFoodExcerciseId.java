package com.example.DoAn1.entities.status_food_excercise;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatusFoodExcerciseId {
    private double BMI;
    private int age;
    private double bloodPressure;
    private double heSoHoatDong;
    private double heartBeat;
    private double bloodSugar;
    private int gender;
}
