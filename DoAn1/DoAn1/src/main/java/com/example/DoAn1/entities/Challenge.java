package com.example.DoAn1.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "challenge")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Challenge {
    @Id
    private String exerciseId;
    private int point;
    private int numberOfUsers;
}
