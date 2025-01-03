package com.example.DoAn1.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseUserStatistic {
    private int totalUsers;
    private int userUnder35;
    private int userOver35;
    private int userOver55;
    private int userThieuCan;
    private int userBinhThuong;
    private int userThuaCan;
    private int userBeoPhi;
    // hai long
    private int bad;
    private int good;
    private int satisfied;
}
