package com.example.DoAn1.mapper;

import org.springframework.stereotype.Component;

import com.example.DoAn1.entities.Food;
import com.example.DoAn1.request.FoodCreationRequest;

@Component
public class FoodMapper {
    public static Food convertRequest(FoodCreationRequest foodCreationRequest) {
        return Food.builder()
                .name(foodCreationRequest.getName())
                .level(foodCreationRequest.getLevel())
                .method(foodCreationRequest.getMethod())
                .diet(foodCreationRequest.getDiet())
                .calories(foodCreationRequest.getCalories())
                .time(foodCreationRequest.getTime())
                .type(foodCreationRequest.getType())
                .listIngredient(foodCreationRequest.getListIngredient())
                .listWeightIngredient(foodCreationRequest.getListWeightIngredient())
                .listCaloriesIngredient(foodCreationRequest.getListCaloriesIngredient())
                .listStep(foodCreationRequest.getListStep())
                .linkVideo(foodCreationRequest.getLinkVideo())
                .carb(foodCreationRequest.getCarb())
                .protein(foodCreationRequest.getProtein())
                .fat(foodCreationRequest.getFat())
                .flagBloodGlucose(foodCreationRequest.getFlagBloodGlucose())
                .flagBloodPressure(foodCreationRequest.getFlagBloodPressure())
                .flagHeart(foodCreationRequest.getFlagHeart())
                .numberOfLikes(0)
                .descriptionFood(foodCreationRequest.getDescription())
                .build();
    }
}
