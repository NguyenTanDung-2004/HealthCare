package com.example.DoAn1.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateFoodRequest {
    private String name;
    private float weight;
    private float calories;
    private float protein;
    private float carb;
    private float fat;
    private int flag;
}
