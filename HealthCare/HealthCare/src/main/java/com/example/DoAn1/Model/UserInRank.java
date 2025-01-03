package com.example.DoAn1.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInRank {
    private String linkImage;
    private String name;
    private float BMI;
    private int currentPoint;
    private Long rank;
}
