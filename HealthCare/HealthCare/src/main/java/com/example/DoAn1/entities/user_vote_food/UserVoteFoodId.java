package com.example.DoAn1.entities.user_vote_food;

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
public class UserVoteFoodId {
    private String userId;
    private String foodId;
}
