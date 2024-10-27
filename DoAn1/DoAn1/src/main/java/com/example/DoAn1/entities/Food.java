package com.example.DoAn1.entities;

import java.util.HashSet;
import java.util.List;

import com.example.DoAn1.entities.user_vote_food.UserVoteFood;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "food")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    private int level; // 1: hard, 2: medium, 3: easy
    private int method;
    // 1: nước uống, 2: xào, 3 - rang, 4 - nướng, 5 - canh
    // 6 - kho, 7 - hấp, 8 - hầm, 9 - chiên dầu, 10 - chiên không dầu, 11 - pha chế
    // 12 - luộc
    private int diet;
    // 1 - ít tinh bột, 2 - ít chất béo, 3 - nhiều đạm
    // 4 - thuần chay, 5 - ăn chay (trứng, sữa), 6 - Healthy
    // 7 - bình thường
    private double calories;
    private double time;
    private int type;
    // 1 - món chính, 2 - món phụ, 3 - món ăn vặt
    // 4 - món ăn sáng.
    // 5 - đồ uống
    @Column(columnDefinition = "blob") // Specify nvarchar column type
    private List<String> listIngredient;
    @Column(columnDefinition = "blob") // Specify nvarchar column type
    private List<Double> listWeightIngredient;
    @Column(columnDefinition = "blob") // Specify nvarchar column type
    private List<Double> listCaloriesIngredient;
    @Column(columnDefinition = "blob") // Specify nvarchar column type
    private List<String> listStep;
    @Column(columnDefinition = "blob") // Specify nvarchar column type
    private List<String> listLinkImage;
    private String linkVideo;
    private double carb;
    private double protein;
    private double fat;
    private int flagBloodPressure; // 1 hạn chế, 0
    private int flagBloodGlucose; // 1 hạn chế, 0
    private int flagHeart; // 1 hạn chế, 0

    @Column(nullable = false, columnDefinition = "Integer default 0")
    private Integer numberOfLikes;

    @Column(columnDefinition = "longtext")
    private String descriptionFood;

    @ManyToMany(mappedBy = "likedFoods")
    private java.util.Set<User> users = new HashSet<>();

    // user vote food
    @OneToMany(mappedBy = "food")
    private Set<UserVoteFood> userFoods = new HashSet<>();
}
