package com.example.DoAn1.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCompleteRequest {
    private int height;
    private int weight;
    private float bloodGlucoseRange; // 1 2 3
    private float bloodPressureRange; // 1 2 3 4 5
    private float heartRateRange; // 1 2 3
    private float bloodGlucoseRange1; // 1 2 3
    private float bloodPressureRange1; // 1 2 3 4 5
    private float heartRateRange1; // 1 2 3
}
