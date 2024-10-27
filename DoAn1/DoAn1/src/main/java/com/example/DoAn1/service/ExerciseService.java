package com.example.DoAn1.service;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DoAn1.Model.Vote;
import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.status_food_excercise.StatusFoodExcerciseId;
import com.example.DoAn1.entities.status_food_excercise.UserStatus_Food_Excercise;
import com.example.DoAn1.mapper.ExcerciseMapper;
import com.example.DoAn1.repository.ExerciseRepository;
import com.example.DoAn1.repository.StatusFoodExcerciseRepository;
import com.example.DoAn1.repository.UserRepository;
import com.example.DoAn1.request.ExcerciseCreationRequest;
import com.example.DoAn1.response.ResponseCode;
import com.example.DoAn1.response.ResponseExerciseDetail;
import com.example.DoAn1.response.ResponseExercises;
import com.example.DoAn1.support_service.SupportExerciseService;
import com.example.DoAn1.support_service.SupportFoodService;
import com.example.DoAn1.support_service.SupportUserService;
import com.example.DoAn1.utils.UtilsHandleFile;
import com.example.DoAn1.utils.UtilsHandleJwtToken;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;
import java.io.File;
import java.util.List;
import java.util.ArrayList;
import java.util.HashSet;

@Service
public class ExerciseService {

    @Autowired
    private SupportExerciseService supportExerciseService;

    @Autowired
    private UtilsHandleFile utilsHandleFile;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ExcerciseMapper exerciseMapper;

    @Autowired
    private SupportUserService supportUserService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private SupportFoodService supportFoodService;

    @Autowired
    private StatusFoodExcerciseRepository statusFoodExcerciseRepository;

    public ResponseEntity addExercise(List<ExcerciseCreationRequest> list) {
        String filePath = this.utilsHandleFile.getPathOfStatic();
        Map<Integer, File> map = this.utilsHandleFile.createMapIndexFolder(filePath, list.get(0).getType());
        for (int i = 0; i < list.size(); i++) {
            this.supportExerciseService.save1Exercise(exerciseRepository, list.get(i), exerciseMapper, i, map);
        }
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.AddExercise));
    }

    public ResponseEntity likeExcercise(HttpServletRequest httpServletRequest, List<String> excerciseId) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        // create status_food_excercise id
        StatusFoodExcerciseId id = this.supportFoodService.createStatusFoodExcerciseId(user);
        // get Row UserStatus_Food_Excercise by user status
        java.util.Optional<UserStatus_Food_Excercise> opt = this.statusFoodExcerciseRepository.findById(id);
        UserStatus_Food_Excercise status_Food_Excercise = null;
        if (opt.isEmpty() == true) {
            status_Food_Excercise = new UserStatus_Food_Excercise();
            status_Food_Excercise.setStatusFoodExcerciseId(id);
            status_Food_Excercise.setFoodId(new HashSet<>());
            status_Food_Excercise.setExcerciseId(new HashSet<>());
        } else {
            status_Food_Excercise = opt.get();
        }
        // add food Id into user_liked_food
        this.supportExerciseService.addListExcerciseIdToUserLikedExcercise(user, excerciseId);
        // add foodId into UserStatus_Food_Excercise
        this.supportExerciseService.addListExcerciseIdToStatusFoodExcercise(status_Food_Excercise, excerciseId);
        // increase number of likes
        this.supportExerciseService.increaseNumberOfLikes(excerciseId);

        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.LikeFood));
    }

    public ResponseEntity voteExercise(List<Vote> foodId, HttpServletRequest httpServletRequest) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        // vote exercise
        this.supportExerciseService.insertVoteFood(foodId, user);

        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.VoteFood));
    }

    public ResponseEntity getExercises(int page, HttpServletRequest httpServletRequest) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();

        // create response
        java.util.List<ResponseExercises> listResponseExercises = new ArrayList<>();
        List<Excercise> listExcercises = this.exerciseRepository.getExerciseBasedOnPage(9, page * 9);

        this.supportExerciseService.createListResponseExercises(listExcercises, user, listResponseExercises);

        return ResponseEntity.ok().body(listResponseExercises);
    }

    public ResponseEntity getExerciseDetail(String exerciseId, HttpServletRequest httpServletRequest) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();

        // get exercise
        Excercise excercise = this.exerciseRepository.findById(exerciseId).get();

        // create exercise details
        ResponseExerciseDetail responseExerciseDetail = this.supportExerciseService.createResponseExerciseDetail(user,
                excercise);

        return ResponseEntity.ok().body(responseExerciseDetail);
    }

    public ResponseEntity getExercises(HttpServletRequest httpServletRequest) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();

        // create response
        java.util.List<ResponseExercises> listResponseExercises = new ArrayList<>();
        List<Excercise> listExcercises = this.exerciseRepository.findAll();

        this.supportExerciseService.createListResponseExercises(listExcercises, user, listResponseExercises);

        return ResponseEntity.ok().body(listResponseExercises);
    }
}
