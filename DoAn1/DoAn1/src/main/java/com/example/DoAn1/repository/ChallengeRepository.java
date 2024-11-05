package com.example.DoAn1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.DoAn1.entities.Challenge;
import com.example.DoAn1.entities.Excercise;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, String> {
    @Query(value = "SELECT e.id, e.link_video, e.list_han_che, e.list_images, e.met, e.name, e.time, e.type, e.number_of_likes, c.point, c.number_of_users "
            +
            "FROM challenge c " +
            "INNER JOIN exercise e ON c.exercise_id = e.id", nativeQuery = true)
    public List<Object[]> getListExercise();
}
