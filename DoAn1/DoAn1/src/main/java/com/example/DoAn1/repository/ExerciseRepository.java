package com.example.DoAn1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.DoAn1.entities.Excercise;
import java.util.List;

public interface ExerciseRepository extends JpaRepository<Excercise, String> {
    @Query(value = "select * from exercise limit :limit offset :skip", nativeQuery = true)
    public List<Excercise> getExerciseBasedOnPage(int limit, int skip);

    @Query(value = "select count(*) from user_like_excercise where user_id = :userId and excercise_id = :excerciseId", nativeQuery = true)
    public int likedExercise(String userId, String excerciseId);

    @Query(value = "select * from exercise where type = :type limit 6", nativeQuery = true)
    public List<Excercise> getListRelatedExercise(String type);
}
