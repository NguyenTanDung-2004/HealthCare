package com.example.DoAn1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.Food;
import java.util.List;

public interface FoodRepository extends JpaRepository<Food, String> {
    @Query(value = "select name from food order by name", nativeQuery = true)
    public List<String> getAllFoodName();

    @Query(value = "select * from food order by name", nativeQuery = true)
    public List<Food> getAllFoodSortedByName();

    @Query("select c from Food c where c.type = :type and c.id <> :foodId")
    public List<Food> getFoodAccordingToType(int type, String foodId);

    @Query("select c from Food c where c.diet = :diet and c.id <> :foodId")
    public List<Food> getFoodAccordingToDiet(int diet, String foodId);

    @Query("select c from Food c where c.method = :method and c.id <> :foodId")
    public List<Food> getFoodAccordingToMethod(int method, String foodId);

    @Query(value = "select count(*) from user_like_food where user_id = :userId and food_id = :foodId", nativeQuery = true)
    public int likedFood(String userId, String foodId);

    @Query(value = "select * from food limit :limit offset :skip", nativeQuery = true)
    public List<Food> getFoodsBasedOnPage(int limit, int skip);
}
