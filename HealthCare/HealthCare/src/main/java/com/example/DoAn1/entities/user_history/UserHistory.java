package com.example.DoAn1.entities.user_history;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.DoAn1.Model.Meal;
import com.example.DoAn1.Model.UserFoodInUserHistory;
import com.example.DoAn1.entities.Food;
import com.example.DoAn1.entities.user_food.UserFood;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;
import java.util.HashMap;

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
    private Float currentBurned; // update
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

    @Transient
    private Map<String, Integer> exercises = new HashMap();

    @Transient
    private Map<String, Integer> foods = new HashMap();

    @Column(columnDefinition = "blob") // Use "BLOB" if you expect large data
    private String exercisesJson;

    @Column(columnDefinition = "blob") // Use "BLOB" if you expect large data
    private String foodsJson;

    @Column(columnDefinition = "blob")
    private List<String> listFoodInSystem; // this column will be used to save all data about system food as json

    @Column(columnDefinition = "blob")
    private List<String> listUserFood; // this column will be used to save all data about user food as json

    private static final ObjectMapper mapper = new ObjectMapper();

    // Custom getter: converts JSON to Map when accessing the field
    public Map<String, Integer> getExercisesFromExerciseJson() {
        if (exercisesJson == null || exercisesJson.isEmpty()) {
            return new HashMap<>();
        }
        try {
            return mapper.readValue(exercisesJson, new TypeReference<Map<String, Integer>>() {
            });
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return new HashMap<>();
        }
    }

    // Custom setter: converts Map to JSON when setting the field
    public void setExerciseJsonFromExercises(Map<String, Integer> exercises) {
        try {
            this.exercisesJson = mapper.writeValueAsString(exercises);
            this.exercises = exercises;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            this.exercisesJson = null;
        }
    }

    //
}
