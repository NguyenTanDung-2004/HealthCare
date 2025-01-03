package com.example.DoAn1.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.DoAn1.entities.status_food_excercise.StatusFoodExcerciseId;
import com.example.DoAn1.entities.status_food_excercise.UserStatus_Food_Excercise;

public interface StatusFoodExcerciseRepository extends JpaRepository<UserStatus_Food_Excercise, StatusFoodExcerciseId> {

        @Query(value = "select * from status_food_excercise where excercise_id is null limit :limit", nativeQuery = true)
        public List<UserStatus_Food_Excercise> listStatusExercise(int limit);

        @Query(value = "select * from status_food_excercise where food_id is null limit :limit", nativeQuery = true)
        public List<UserStatus_Food_Excercise> listStatusFood(int limit);

        @Query(value = "SELECT * \n" + //
                        "FROM status_food_excercise\n" + //
                        "order by \n" + //
                        "\tcosine_similarity(\n" + //
                        "        :BMI, :age, :pressure, :sugar, :gender, :he_so_hoat_dong, :heart_beat,\n" + //
                        "        bmi, age, blood_pressure, blood_sugar, gender, he_so_hoat_dong, heart_beat\n" + //
                        "    ) desc\n" + //
                        "limit 5", nativeQuery = true)
        public List<UserStatus_Food_Excercise> getListRecommendedExercise(double BMI, int age, double pressure,
                        double sugar, int gender,
                        double he_so_hoat_dong, double heart_beat);

        @Query(value = "SELECT * \n" + //
                        "FROM status_food_excercise\n" + //
                        "order by \n" + //
                        "\tcosine_similarity(\n" + //
                        "        :BMI, :age, :pressure, :sugar, :gender, :he_so_hoat_dong, :heart_beat,\n" + //
                        "        bmi, age, blood_pressure, blood_sugar, gender, he_so_hoat_dong, heart_beat\n" + //
                        "    ) desc\n" + //
                        "limit 5", nativeQuery = true)
        public List<UserStatus_Food_Excercise> getListRecommendedFood(double BMI, int age, double pressure,
                        double sugar, int gender,
                        double he_so_hoat_dong, double heart_beat);
}
