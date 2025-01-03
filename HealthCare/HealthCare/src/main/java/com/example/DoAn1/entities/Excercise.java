package com.example.DoAn1.entities;

import java.util.List;

import com.example.DoAn1.entities.user_vote_excercise.UserVoteExcercise;
import com.example.DoAn1.entities.user_vote_food.UserVoteFood;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Builder
@Table(name = "exercise")
@AllArgsConstructor
@NoArgsConstructor
public class Excercise {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    private Integer time;
    private Float met;
    @Column(columnDefinition = "blob") // Specify nvarchar column type
    private List<String> listHanChe;
    @Column(columnDefinition = "blob") // Specify nvarchar column type
    private List<String> listImages;
    private String linkVideo;
    private String type;
    private Integer numberOfPractices; //

    @Column(nullable = false, columnDefinition = "Integer default 0")
    private Integer numberOfLikes;

    @ManyToMany(mappedBy = "likedExcercises")
    private java.util.Set<User> users = new HashSet<>();

    // user vote excercise
    @OneToMany(mappedBy = "excercise")
    private Set<UserVoteExcercise> userExcercises = new HashSet<>();

    // Constructor
    public Excercise(String id, String name, Integer time, Float met, List<String> listHanChe, List<String> listImages,
            String linkVideo, String type, Integer numberOfLikes) {
        this.id = id;
        this.name = name;
        this.time = time;
        this.met = met;
        this.listHanChe = listHanChe;
        this.listImages = listImages;
        this.linkVideo = linkVideo;
        this.type = type;
        this.numberOfLikes = numberOfLikes;
    }
}
