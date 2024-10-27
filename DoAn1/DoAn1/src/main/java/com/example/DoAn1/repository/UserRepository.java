package com.example.DoAn1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.DoAn1.entities.User;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, String> {
    @Query("select u from User u where u.email = :email")
    public User getUserByEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "insert into user_like_food (user_id, food_id) values (:userId, :foodId)", nativeQuery = true)
    public void insertUserLikeFood(String userId, String foodId);

    @Modifying
    @Transactional
    @Query(value = "insert into user_like_excercise (user_id, excercise_id) values (:userId, :excerciseId)", nativeQuery = true)
    public void insertUserLikeExcercise(String userId, String excerciseId);
}
