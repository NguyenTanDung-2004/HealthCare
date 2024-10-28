package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseUserFood {
    private String name;
    private float calories;
    private float protein;
    private float fat;
    private float carb;
}
