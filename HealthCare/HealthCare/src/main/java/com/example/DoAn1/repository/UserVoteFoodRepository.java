package com.example.DoAn1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.DoAn1.entities.user_vote_food.UserVoteFood;
import com.example.DoAn1.entities.user_vote_food.UserVoteFoodId;

public interface UserVoteFoodRepository extends JpaRepository<UserVoteFood, UserVoteFoodId> {

    @Query("select c from UserVoteFood c where c.id.foodId = :foodId")
    public List<UserVoteFood> getListUserVoteFood(String foodId);
}
