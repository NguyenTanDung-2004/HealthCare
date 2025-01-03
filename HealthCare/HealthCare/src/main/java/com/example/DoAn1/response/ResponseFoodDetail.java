package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Set;
import com.example.DoAn1.Model.RelatedFood;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseFoodDetail {
    private int type;
    private String name;
    private double calories;
    private double protein;
    private double fat;
    private double carb;
    private String description;
    private int method;
    private double time;
    private int level;
    private int diet;
    private int numberOfLikes;
    private List<String> listIngredient;
    private List<Double> listWeightIngredient;
    private List<Double> listCaloriesIngredient;
    private String linkVideo;
    private List<String> listLinkImage;
    private int flagBloodPressure; // 1 hạn chế, 0
    private int flagBloodGlucose; // 1 hạn chế, 0
    private int flagHeart; // 1 hạn chế, 0
    private int flagLiked;
    private float stars;
    private Set<RelatedFood> relatedFoods;
    private List<String> listStep;
}
