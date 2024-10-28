package com.example.DoAn1.entities.user_food;

import jakarta.annotation.Generated;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_food")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserFood {
    @EmbeddedId
    private UserFoodId userFoodId;
    private float weight;
    private float calories;
    private float protein;
    private float carb;
    private float fat;
}
