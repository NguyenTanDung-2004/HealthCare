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

    @Query(value = "select * from user_history where user_id = :userId \n" + //
            "order by year, month, day desc\n" + //
            "limit 7", nativeQuery = true)
    public List<UserHistory> getListUserHistory(String userId);

    @Query(value = "select * from user_history \n" + //
            "where user_id = :userId and user_history.month = :month and user_history.year = :year \n"
            + //
            "order by year, month, day ", nativeQuery = true)
    public List<UserHistory> getListUserHistories(String userId, int month, int year);

    @Query(value = "select * from user_history \n" + //
            "where user_id = :userId and user_history.month = :month and user_history.year = :year \n" + //
            "order by current_burned desc\n" + //
            "limit 3 ", nativeQuery = true)
    public List<UserHistory> getListUserHistoriesBasedOnBurned(int month, int year, String userId);

    @Query(value = "select * from user_history \n" + //
            "where user_id = :userId and user_history.month = :month and user_history.year = :year \n" + //
            "order by current_calories desc\n" + //
            "limit 3 ", nativeQuery = true)
    public List<UserHistory> getListUserHistoriesBasedOnCalories(int month, int year, String userId);

    @Query(value = "select * from user_history \n" + //
            "where user_id = :userId and user_history.month = :month and user_history.year = :year \n" + //
            "order by current_fat desc\n" + //
            "limit 3 ", nativeQuery = true)
    public List<UserHistory> getListUserHistoriesBasedOnFat(int month, int year, String userId);

    @Query(value = "select * from user_history \n" + //
            "where user_id = :userId and user_history.month = :month and user_history.year = :year \n" + //
            "order by current_carb desc\n" + //
            "limit 3 ", nativeQuery = true)
    public List<UserHistory> getListUserHistoriesBasedOnCarb(int month, int year, String userId);

    @Query(value = "select * from user_history \n" + //
            "where user_id = :userId and user_history.month = :month and user_history.year = :year \n" + //
            "order by current_protein desc\n" + //
            "limit 3 ", nativeQuery = true)
    public List<UserHistory> getListUserHistoriesBasedOnProtein(int month, int year, String userId);
}
