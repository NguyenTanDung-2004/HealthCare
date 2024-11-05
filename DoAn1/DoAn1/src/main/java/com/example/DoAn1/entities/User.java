package com.example.DoAn1.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.HashSet;
import java.util.Set;
import java.util.HashSet;
import org.hibernate.mapping.List;

import com.example.DoAn1.entities.user_vote_excercise.UserVoteExcercise;
import com.example.DoAn1.entities.user_vote_food.UserVoteFood;

@Entity
@Table(name = "[user]")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;
    private String role;
    private String email;
    private String firstName;
    private String lastName;
    private String gentle;
    private Date dob;
    private String password;
    private float height;
    private float weight;
    private float bloodPressure;
    private float hearBeat;
    private float bloodSugar;
    @Column(nullable = false, columnDefinition = "float default 1")
    private Float heSoHoatDong; // 1.2 - ít hoạt động
    // 1.375 - tập thể dục nhẹ 1 - 3 ngày một tuần
    // 1.55 - tập thể dục vừa phải 3 - 5 ngày 1 tuần
    // 1.725 - tập thể dục nặng 6 - 7 ngày 1 tuần.
    //
    private float bloodPressure1;
    private float bloodSugar1;
    //
    private String code; // code to reset email.

    // relationship n - n with food
    @ManyToMany
    @JoinTable(name = "user_like_food", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "food_id"))
    private java.util.Set<Food> likedFoods = new HashSet<>();

    // relationship n - n with food
    @ManyToMany
    @JoinTable(name = "user_like_excercise", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "excercise_id"))
    private java.util.Set<Excercise> likedExcercises = new HashSet<>();

    // user vote food
    @OneToMany(mappedBy = "user")
    private Set<UserVoteFood> userFoods = new HashSet<>();

    // user vote excercise
    @OneToMany(mappedBy = "user")
    private Set<UserVoteExcercise> userExcercises = new HashSet<>();

    // challenge
    private int point;
}
