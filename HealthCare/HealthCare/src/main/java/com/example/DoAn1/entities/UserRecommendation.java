package com.example.DoAn1.entities;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_recommendation")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRecommendation {
    @Id
    private String userId;
    @Column(columnDefinition = "blob") // Specify nvarchar column type
    private Set<String> foodId;
    @Column(columnDefinition = "blob") // Specify nvarchar column type
    private Set<String> excerciseId;
}
