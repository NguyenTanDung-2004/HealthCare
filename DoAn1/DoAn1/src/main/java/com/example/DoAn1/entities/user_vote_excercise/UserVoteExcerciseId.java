package com.example.DoAn1.entities.user_vote_excercise;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class UserVoteExcerciseId {
    private String userId;
    private String excerciseId;
}
