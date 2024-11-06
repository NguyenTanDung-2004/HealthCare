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

    @Query(value = "select \n" + //
            "\tnumber_of_users,\n" + //
            "    name\n" + //
            "from exercise inner join challenge \n" + //
            "\ton exercise.id = challenge.exercise_id\n" + //
            "order by challenge.number_of_users\n" + //
            "limit 3", nativeQuery = true)
    public List<Object[]> getTop3Exercise();

    @Query(value = "select *\n" + //
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
            "    ) as rank_table", nativeQuery = true)
    public List<Object[]> getListUserInRank();
}
