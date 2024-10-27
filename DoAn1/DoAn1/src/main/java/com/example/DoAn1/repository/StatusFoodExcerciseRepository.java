package com.example.DoAn1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.DoAn1.entities.status_food_excercise.StatusFoodExcerciseId;
import com.example.DoAn1.entities.status_food_excercise.UserStatus_Food_Excercise;

public interface StatusFoodExcerciseRepository extends JpaRepository<UserStatus_Food_Excercise, StatusFoodExcerciseId> {

}
