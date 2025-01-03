package com.example.DoAn1.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavedFood {
    private String foodName;
    private float weight;
    private float calories;
    private float carb;
    private float fat;
    private float protein;
    private int flag; // 1 - sang, 2 trua, 3 toi, 4 phu
}
