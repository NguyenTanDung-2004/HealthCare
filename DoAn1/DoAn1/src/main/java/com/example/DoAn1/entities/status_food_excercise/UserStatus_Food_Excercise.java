package com.example.DoAn1.entities.status_food_excercise;

import java.util.Set;

import jakarta.persistence.Column;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "status_food_excercise")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserStatus_Food_Excercise {
    @EmbeddedId
    private StatusFoodExcerciseId statusFoodExcerciseId;
    @Column(columnDefinition = "blob") // Specify nvarchar column type // we need to check null for foodId before we
                                       // handle it
    private Set<String> foodId;
    @Column(columnDefinition = "blob") // Specify nvarchar column type
    private Set<String> excerciseId;
}
