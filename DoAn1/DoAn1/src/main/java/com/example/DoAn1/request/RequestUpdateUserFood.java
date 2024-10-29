package com.example.DoAn1.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestUpdateUserFood {
    private String newName;
    private String oldName;
    private float fat;
    private float calories;
    private float protein;
    private float carb;
    private float weight;
}
