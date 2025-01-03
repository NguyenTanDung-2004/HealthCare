package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseFoodDetailInSystem {
    private float weight;
    private float height;
    private float calories;
    private float carb;
    private float protein;
    private float fat;
    private float walking;
    private float running;
    private float skipping;
    private float swimming;
    private float riding;
}
