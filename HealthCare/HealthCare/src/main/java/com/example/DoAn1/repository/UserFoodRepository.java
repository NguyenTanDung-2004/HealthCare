package com.example.DoAn1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.DoAn1.entities.user_food.UserFood;
import com.example.DoAn1.entities.user_food.UserFoodId;
import java.util.List;

public interface UserFoodRepository extends JpaRepository<UserFood, UserFoodId> {
    @Query(value = "select count(*) from user_food where user_id = :userId and lower(user_food_name) = lower(:foodName)", nativeQuery = true)
    public int checkFoodName(@Param("userId") String userId, @Param("foodName") String foodName);

    @Query(value = "select * from user_food where user_id = :userId", nativeQuery = true)
    public List<UserFood> getListUserFood(String userId);
}
