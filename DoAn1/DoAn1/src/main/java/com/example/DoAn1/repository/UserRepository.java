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

    @Query(value = "select rank_table.rank \n" + //
            "from \n" + //
            "\t(\n" + //
            "\t\tSELECT \n" + //
            "\t\t\tuser_id,\n" + //
            "\t\t\tCONCAT(first_name, last_name) AS name,\n" + //
            "\t\t\tweight,\n" + //
            "\t\t\theight,\n" + //
            "\t\t\tpoint,\n" + //
            "\t\t\tDENSE_RANK() OVER ( ORDER BY point desc ) AS \"rank\"\n" + //
            "\t\tFROM user\n" + //
            "    ) as rank_table\n" + //
            "where \n" + //
            "\trank_table.user_id = :userId", nativeQuery = true)
    public int getRankOfUser(String userId);

    @Query(value = "select rank_table.rank\n" + //
            "from \n" + //
            "\t(\n" + //
            "\t\tSELECT \n" + //
            "\t\t\tuser_id,\n" + //
            "\t\t\tCONCAT(first_name, last_name) AS name,\n" + //
            "\t\t\tweight,\n" + //
            "\t\t\theight,\n" + //
            "\t\t\tpoint,\n" + //
            "\t\t\tDENSE_RANK() OVER ( ORDER BY point desc ) AS \"rank\"\n" + //
            "\t\tFROM user\n" + //
            "    ) as rank_table\n" + //
            "limit 1", nativeQuery = true)
    public int getMaxRank();
}
