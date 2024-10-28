package com.example.DoAn1.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestAddSystemFood {
    private String id;
    private float weight;
    private int flag; // 1 - sang, 2 - trua, 3 - toi, 4 - phu
}
