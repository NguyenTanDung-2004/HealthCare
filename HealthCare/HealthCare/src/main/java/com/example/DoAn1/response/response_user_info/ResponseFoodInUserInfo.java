package com.example.DoAn1.response.response_user_info;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseFoodInUserInfo {
    private String name;
    private String imageLink;
    private String foodId;
    private float protein;
    private float carb;
    private float fat;
    private float calories;
}
