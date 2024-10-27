package com.example.DoAn1.entities.user_history;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.DoAn1.entities.Food;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_history")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserHistory {
    @EmbeddedId
    private UserHistoryId userHistoryId;
    private Float totalCalories;
    private Float currentCalories;
    private Float totalFat;
    private Float currentFat;
    private Float totalCarb;
    private Float currentCarb;
    private Float totalProtein;
    private Float currentProtein;

    private float height;
    private float weight;
    private float bloodPressure;
    private float hearBeat;
    private float bloodSugar;

    private Float heSoHoatDong;
    private float bloodPressure1;
    private float bloodSugar1;

    private int flagDiet; // 1 - can bang, 2 - it tinh bot, 3 - nhieu dam

    @Column(columnDefinition = "blob") // Specify nvarchar column type
    private List<String> foodId = new ArrayList<>();
    @Column(columnDefinition = "blob") // Specify nvarchar column type
    private List<String> excerciseId = new ArrayList<>();
}
