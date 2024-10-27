package com.example.DoAn1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.DoAn1.entities.user_vote_excercise.UserVoteExcercise;
import com.example.DoAn1.entities.user_vote_excercise.UserVoteExcerciseId;
import com.example.DoAn1.entities.user_vote_food.UserVoteFood;

public interface UserVoteExerciseRepository extends JpaRepository<UserVoteExcercise, UserVoteExcerciseId> {
    @Query("select c from UserVoteExcercise c where c.id.excerciseId = :exerciseId")
    public List<UserVoteExcercise> getListUserVoteExercise(String exerciseId);
}
