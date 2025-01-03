package com.example.DoAn1.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExcerciseCreationRequest {
    private String name;
    private Integer time;
    private Float met;
    private List<String> listHanChe;
    private List<String> listImages;
    private String linkVideo;
    private String type;
}
