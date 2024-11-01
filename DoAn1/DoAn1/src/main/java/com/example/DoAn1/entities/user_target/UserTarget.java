package com.example.DoAn1.entities.user_target;

import java.util.Date;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "user_target")
public class UserTarget {
    @EmbeddedId
    private UserTargetId userTargetId;
    private Date end;
    private int flagIncrease; // 1 tăng cân, 2 giảm cân
    private float weight;
    private String name;
}
