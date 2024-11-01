package com.example.DoAn1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.DoAn1.entities.user_target.UserTarget;
import com.example.DoAn1.entities.user_target.UserTargetId;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface UserTargetRepository extends JpaRepository<UserTarget, UserTargetId> {
    @Query(value = "select * from user_target where user_id = :userId", nativeQuery = true)
    public List<UserTarget> getListUserTarget(String userId);

    @Query(value = "select end from user_target\n" + //
            "where user_id = :userId \n" + //
            "order by user_target.end desc\n" + //
            "limit 1", nativeQuery = true)
    public Date getDate(String userId);
}
