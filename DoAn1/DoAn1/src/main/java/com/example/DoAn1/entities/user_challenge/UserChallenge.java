package com.example.DoAn1.entities.user_challenge;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_challenge")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserChallenge {
    @EmbeddedId
    private UserChallengeId userChallengeId;
    private int number;
}
