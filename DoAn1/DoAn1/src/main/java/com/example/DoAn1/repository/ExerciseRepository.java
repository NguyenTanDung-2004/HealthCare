package com.example.DoAn1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.DoAn1.entities.Excercise;

import jakarta.transaction.Transactional;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Excercise, String> {
    @Query(value = "select * from exercise limit :limit offset :skip", nativeQuery = true)
    public List<Excercise> getExerciseBasedOnPage(int limit, int skip);

    @Query(value = "select count(*) from user_like_excercise where user_id = :userId and excercise_id = :excerciseId", nativeQuery = true)
    public int likedExercise(String userId, String excerciseId);

    @Query(value = "select * from exercise where type = :type limit 6", nativeQuery = true)
    public List<Excercise> getListRelatedExercise(String type);

    @Query(value = "select count(*) from exercise where name = :name", nativeQuery = true)
    public int checkExerciseName(String name);

    @Modifying
    @Transactional
    @Query(value = "delete from user_like_excercise where excercise_id = :exerciseId", nativeQuery = true)
    public void deleteUserLikeExercise(String exerciseId);

    @Modifying
    @Transactional
    @Query(value = "delete from user_vote_excercise where excercise_id = :exerciseId", nativeQuery = true)
    public void deleteUserVoteExercise(String exerciseId);

    @Query(value = "select * from exercise\n" + //
            "order by number_of_likes desc\n" + //
            "limit 3", nativeQuery = true)
    public List<Excercise> getTop3Exercise();
}
