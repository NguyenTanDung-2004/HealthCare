package com.example.DoAn1.utils;

import com.example.DoAn1.Model.SavedFood;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class UtilsHandleJson {
    private static final ObjectMapper mapper = new ObjectMapper();

    public static SavedFood convertStringToSavedFood(String s) {
        try {
            return mapper.readValue(s, new TypeReference<SavedFood>() {
            });
        } catch (JsonMappingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    public static String convertSavedFoodToString(SavedFood savedFood) {
        try {
            return mapper.writeValueAsString(savedFood);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }
}
