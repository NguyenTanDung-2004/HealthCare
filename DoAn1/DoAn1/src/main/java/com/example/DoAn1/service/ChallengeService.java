package com.example.DoAn1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DoAn1.entities.Challenge;
import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.user_challenge.UserChallenge;
import com.example.DoAn1.repository.ChallengeRepository;
import com.example.DoAn1.repository.UserChallengeRepository;
import com.example.DoAn1.repository.UserRepository;
import com.example.DoAn1.request.RequestCreateExerciseChallenge;
import com.example.DoAn1.response.ResponseCode;
import com.example.DoAn1.support_service.SupportUserService;
import com.example.DoAn1.utils.UtilsHandleJwtToken;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

import java.util.List;

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

    public ResponseEntity createChallenges(List<RequestCreateExerciseChallenge> listRequestCreateExerciseChallenges) {
        // iterate
        for (int i = 0; i < listRequestCreateExerciseChallenges.size(); i++) {
            // map
            Challenge challenge = Challenge.builder()
                    .exerciseId(listRequestCreateExerciseChallenges.get(i).getExerciseId())
                    .point(listRequestCreateExerciseChallenges.get(i).getPoint())
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
        List<Excercise> listExcercises = this.challengeRepository.getListExercise();
        // create response
    }
}
