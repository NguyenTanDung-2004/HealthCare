package com.example.DoAn1.Model;

import com.example.DoAn1.entities.user_food.UserFood;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Meal {
    private UserFood userFood;
    private int flag; // 1 - sang, 2 - trua, 3 - toi, 4 - phu

}
