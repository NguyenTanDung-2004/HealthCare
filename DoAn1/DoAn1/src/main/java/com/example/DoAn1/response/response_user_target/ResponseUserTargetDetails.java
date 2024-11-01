package com.example.DoAn1.response.response_user_target;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseUserTargetDetails {
    private List<Response1DayUserTarget> listResponse1DayUserTargets;
    private float targetWeight;
}
