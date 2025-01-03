package com.example.DoAn1.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Top3Exercise {
    private String linkRemovedImage;
    private int numberOfUsers;
    private String name;
}
