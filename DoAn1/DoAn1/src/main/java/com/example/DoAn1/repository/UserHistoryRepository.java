package com.example.DoAn1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.DoAn1.entities.user_history.UserHistory;
import com.example.DoAn1.entities.user_history.UserHistoryId;

public interface UserHistoryRepository extends JpaRepository<UserHistory, UserHistoryId> {
    @Query(value = "SELECT * FROM user_history WHERE (day + month * 10 + year * 100) >= :value AND user_id = :userId", nativeQuery = true)
    List<UserHistory> getListUserHistory(@Param("value") int value, @Param("userId") String userId);
}
