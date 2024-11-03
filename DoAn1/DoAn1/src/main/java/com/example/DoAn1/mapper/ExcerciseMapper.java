package com.example.DoAn1.mapper;

import org.springframework.stereotype.Component;

import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.request.ExcerciseCreationRequest;

@Component
public class ExcerciseMapper {
    public Excercise convertRequest(ExcerciseCreationRequest excerciseCreationRequest) {
        return Excercise.builder()
                .name(excerciseCreationRequest.getName())
                .time(excerciseCreationRequest.getTime())
                .met(excerciseCreationRequest.getMet())
                .listHanChe(excerciseCreationRequest.getListHanChe())
                .linkVideo(excerciseCreationRequest.getLinkVideo())
                .type(excerciseCreationRequest.getType())
                .numberOfLikes(0)
                .build();
    }
}
