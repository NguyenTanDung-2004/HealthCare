package com.example.DoAn1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.Food;

import jakarta.transaction.Transactional;

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

    @Query(value = "select count(*) from food where name = :foodName", nativeQuery = true)
    public int checkFoodByName(String foodName);

    @Modifying
    @Transactional
    @Query(value = "delete from user_like_food where food_id = :foodId", nativeQuery = true)
    public void deleteUserLikeFood(String foodId);

    @Modifying
    @Transactional
    @Query(value = "delete from user_vote_food where food_id = :foodId", nativeQuery = true)
    public void deleteUserVoteFood(String foodId);

    @Query(value = "select * from food\n" + //
            "order by food.number_of_likes desc\n" + //
            "limit 3", nativeQuery = true)
    public List<Food> getTop3Food();
}
