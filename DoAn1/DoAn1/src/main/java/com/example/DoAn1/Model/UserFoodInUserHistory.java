package com.example.DoAn1.Model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserFoodInUserHistory {
    private String userId;
    private String userFoodName;
    private int flag;
}
