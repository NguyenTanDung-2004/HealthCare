package com.example.DoAn1.request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestCreateUserTarget {
    private Date end;
    private int flagIncrease;
    private float weight;
    private String name;
}
