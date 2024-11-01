package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

import com.example.DoAn1.entities.user_target.UserTarget;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseListUserTarget {
    private List<UserTarget> listUserTarget;
    private int flagCreate; // 1 là tạo được, 2 là không tạo được
}
