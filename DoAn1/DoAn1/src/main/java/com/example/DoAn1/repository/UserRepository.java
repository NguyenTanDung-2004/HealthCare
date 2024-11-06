package com.example.DoAn1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.DoAn1.entities.User;
import java.util.List;
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

        @Query(value = "SELECT \n" + //
                        "    COUNT(*) AS total_users,\n" + //
                        "    SUM(CASE WHEN TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE) < 35 THEN 1 ELSE 0 END) AS users_under_35,\n"
                        + //
                        "    SUM(CASE WHEN TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE) > 35 and TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE) < 55 THEN 1 ELSE 0 END) AS users_over_55,\n"
                        + //
                        "    SUM(CASE WHEN TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE) > 55 THEN 1 ELSE 0 END) AS users_over_55,\n"
                        + //
                        "    SUM(CASE when weight / (height * height) < 18.5 THEN 1 ELSE 0 END) AS users_BMI_thieu_can,\n"
                        + //
                        "    SUM(CASE WHEN weight / (height * height) >= 18.5 and weight / (height * height) <= 24.9 THEN 1 ELSE 0 END) AS users_BMI_binh_thuong,\n"
                        + //
                        "    SUM(CASE WHEN weight / (height * height) >= 25 and weight / (height * height) <= 24.9 THEN 1 ELSE 0 END) AS users_BMI_thua_can,\n"
                        + //
                        "    SUM(CASE WHEN weight / (height * height) >= 30 THEN 1 ELSE 0 END) AS users_BMI_beo_phi\n" + //
                        "FROM user;", nativeQuery = true)
        public List<List<Integer>> getUserStatistic();

        @Query(value = "select \n" + //
                        "\tsum(case when flag = 1 then 1 else 0 end) as a,\n" + //
                        "    sum(case when flag = 2 then 1 else 0 end) as b,\n" + //
                        "    sum(case when flag = 3 then 1 else 0 end) as c\n" + //
                        "from user", nativeQuery = true)
        public List<List<Integer>> getRateData();

        @Query(value = "select * from user where list_comments is not null", nativeQuery = true)
        public List<User> getListUser();
}
