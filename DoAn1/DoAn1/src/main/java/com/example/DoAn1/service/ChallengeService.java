package com.example.DoAn1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DoAn1.Model.DayMonthYear;
import com.example.DoAn1.entities.Challenge;
import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.user_challenge.UserChallenge;
import com.example.DoAn1.entities.user_challenge.UserChallengeId;
import com.example.DoAn1.entities.user_history.UserHistory;
import com.example.DoAn1.entities.user_history.UserHistoryId;
import com.example.DoAn1.repository.ChallengeRepository;
import com.example.DoAn1.repository.ExerciseRepository;
import com.example.DoAn1.repository.UserChallengeRepository;
import com.example.DoAn1.repository.UserHistoryRepository;
import com.example.DoAn1.repository.UserRepository;
import com.example.DoAn1.request.RequestCreateExerciseChallenge;
import com.example.DoAn1.response.ResponseCode;
import com.example.DoAn1.response.ResponseExerciseChallenge;
import com.example.DoAn1.response.ResponseRankData;
import com.example.DoAn1.support_service.SupportChallengeService;
import com.example.DoAn1.support_service.SupportUserHistoryService;
import com.example.DoAn1.support_service.SupportUserService;
import com.example.DoAn1.utils.UtilsHandleJwtToken;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChallengeService {
    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private SupportUserService supportUserService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private UserChallengeRepository userChallengeRepository;

    @Autowired
    private SupportChallengeService supportChallengeService;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private SupportUserHistoryService supportUserHistoryService;

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    public ResponseEntity createChallenges(List<RequestCreateExerciseChallenge> listRequestCreateExerciseChallenges) {
        // iterate
        for (int i = 0; i < listRequestCreateExerciseChallenges.size(); i++) {
            // map
            Challenge challenge = Challenge.builder()
                    .exerciseId(listRequestCreateExerciseChallenges.get(i).getExerciseId())
                    .point(listRequestCreateExerciseChallenges.get(i).getPoint())
                    .numberOfUsers(0)
                    .build();
            // save
            this.challengeRepository.save(challenge);
        }
        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.CreateChallenges));
    }

    public ResponseEntity editChallenge(RequestCreateExerciseChallenge requestCreateExerciseChallenge) {
        // get challenge
        Challenge challenge = this.challengeRepository.findById(requestCreateExerciseChallenge.getExerciseId()).get();
        // set value
        challenge.setPoint(requestCreateExerciseChallenge.getPoint());
        // save
        this.challengeRepository.save(challenge);
        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.EditChallenge));
    }

    @Transactional
    public ResponseEntity deleteChallenge(String exerciseId) {
        // delete in challenge
        this.challengeRepository.deleteById(exerciseId);
        // delete in user challenge
        this.userChallengeRepository.deleteChallenge(exerciseId);
        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.DeleteChallenge));
    }

    public ResponseEntity getListExerciseChallenge(HttpServletRequest httpServletRequest) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        // get list exercise challenge
        List<Excercise> listExcercises = new ArrayList<>();
        List<Integer> listPoints = new ArrayList<>();
        List<Object[]> list = this.challengeRepository.getListExercise();
        for (Object[] row : list) {
            String id = (String) row[0]; // e.id
            String linkVideo = (String) row[1]; // e.link_video
            // Convert the byte[] back to List<String>
            List<String> listHanChe = this.supportChallengeService.deserializeList((byte[]) row[2]); // e.list_han_che
            List<String> listImages = this.supportChallengeService.deserializeList((byte[]) row[3]); // e.list_images
            Float met = (Float) row[4]; // e.met
            String name = (String) row[5]; // e.name
            Integer time = (Integer) row[6]; // e.time
            String type = (String) row[7]; // e.type
            Integer numberOfLikes = (Integer) row[8]; // e.number_of_likes

            Excercise exercise = new Excercise(id, name, time, met, listHanChe, listImages, linkVideo, type,
                    numberOfLikes);
            listExcercises.add(exercise);
            // add point
            listPoints.add((Integer) row[9]);
        }
        // create response
        List<ResponseExerciseChallenge> responseExerciseChallenges = this.supportChallengeService
                .creaResponseExerciseChallenges(listExcercises, listPoints, user);
        // return
        return ResponseEntity.ok().body(responseExerciseChallenges);
    }

    public ResponseEntity doExerciseChallenge(HttpServletRequest httpServletRequest, String exerciseId) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();

        // exercise
        Excercise excercise = this.exerciseRepository.findById(exerciseId).get();
        // increase numer of practice
        if (excercise.getNumberOfPractices() == null) {
            excercise.setNumberOfPractices(1);
        } else {
            excercise.setNumberOfPractices(excercise.getNumberOfPractices() + 1);
        }

        // get challenge
        Challenge challenge = this.challengeRepository.findById(exerciseId).get();
        // update point in user
        user.setPoint(user.getPoint() + challenge.getPoint());
        this.userRepository.save(user);
        // get user challenge
        UserChallengeId userChallengeId = UserChallengeId.builder()
                .userId(userId)
                .exerciseId(exerciseId)
                .build();
        Optional<UserChallenge> optional = this.userChallengeRepository.findById(userChallengeId);
        // check and insert user challenge
        if (optional.isEmpty()) {
            UserChallenge userChallenge = UserChallenge.builder()
                    .userChallengeId(UserChallengeId.builder()
                            .userId(userId)
                            .exerciseId(exerciseId)
                            .build())
                    .number(1)
                    .build();
            // create new user challenge
            this.userChallengeRepository.save(userChallenge);
            // update number of users in challenge
            challenge.setNumberOfUsers(challenge.getNumberOfUsers() + 1);
            this.challengeRepository.save(challenge);
        } else {
            // update number in user challenge
            UserChallenge userChallenge = optional.get();
            userChallenge.setNumber(userChallenge.getNumber() + 1);
            this.userChallengeRepository.save(userChallenge);
        }

        // insert history
        // get userHistory
        DayMonthYear currentDayMonthYear = this.supportUserHistoryService.getCurrentDayMonthYear();
        UserHistoryId userHistoryId = new UserHistoryId(currentDayMonthYear.getDay(), currentDayMonthYear.getMonth(),
                currentDayMonthYear.getYear(), userId);
        UserHistory userHistory = this.userHistoryRepository.findById(userHistoryId).get();
        // add exercise
        this.supportUserHistoryService.addExercise(exerciseId, userHistory);
        // update current burned
        float calories = this.supportUserHistoryService.caculateCaloriesBasedOnMet(user, excercise);
        this.supportUserHistoryService.updateCurrentBurned(calories, userHistory);
        // save
        this.userHistoryRepository.save(userHistory);
        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.RecordExercise));
    }

    public ResponseEntity getDataInRankTab(HttpServletRequest httpServletRequest) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        // create response data in rank
        ResponseRankData responseRankData = this.supportChallengeService.createResponseRankData(user);
        // return
        return ResponseEntity.ok().body(responseRankData);
    }
}
