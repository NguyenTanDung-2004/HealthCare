package com.example.DoAn1.entities.user_vote_excercise;

import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.User;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_vote_excercise")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserVoteExcercise {
    @EmbeddedId
    private UserVoteExcerciseId id;

    @ManyToOne
    @MapsId("userId") // Maps the userId from the embedded key
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("excerciseId") // Maps the foodId from the embedded key
    @JoinColumn(name = "excercise_id")
    private Excercise excercise;

    private int stars; // Number of stars the user gives to the food
}
