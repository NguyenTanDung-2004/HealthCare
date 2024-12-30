package com.example.DoAn1.response;

import java.util.List;

import com.example.DoAn1.Model.Top3Exercise;
import com.example.DoAn1.Model.UserInRank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseRankData {
    // user
    private String linkImage;
    private int currentRank;
    private int maxRank;
    private int currentPoint;
    // top 3 exercise
    List<Top3Exercise> top3Exercise;
    // list user
    List<UserInRank> listUserInRanks;

}
