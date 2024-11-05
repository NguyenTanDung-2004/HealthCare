package com.example.DoAn1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.DoAn1.entities.user_challenge.UserChallenge;
import com.example.DoAn1.entities.user_challenge.UserChallengeId;

import jakarta.transaction.Transactional;

public interface UserChallengeRepository extends JpaRepository<UserChallenge, UserChallengeId> {
    @Transactional
    @Modifying
    @Query(value = "delete from user_challenge where exercise_id = :exerciseId", nativeQuery = true)
    public void deleteChallenge(String exerciseId);

    @Query(value = "select count(*) from user_challenge where exercise_id = :exerciseId", nativeQuery = true)
    public int countNumberOfUsers(String exerciseId);
}
