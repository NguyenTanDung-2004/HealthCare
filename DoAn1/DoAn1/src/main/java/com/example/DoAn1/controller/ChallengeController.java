package com.example.DoAn1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.DoAn1.request.RequestCreateExerciseChallenge;
import com.example.DoAn1.service.ChallengeService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@RestController
@RequestMapping("/challenge")
public class ChallengeController {
    @Autowired
    private ChallengeService challengeService;

    @PostMapping("/createChallenges")
    public ResponseEntity createChallenges(
            @RequestBody List<RequestCreateExerciseChallenge> listRequestCreateExerciseChallenges) {
        return this.challengeService.createChallenges(listRequestCreateExerciseChallenges);
    }

    @PostMapping("/editChallenge")
    public ResponseEntity editChallenge(@RequestBody RequestCreateExerciseChallenge requestCreateExerciseChallenge) {
        return this.challengeService.editChallenge(requestCreateExerciseChallenge);
    }

    @PostMapping("/deleteChallenge")
    public ResponseEntity deleteChallenge(@RequestParam(name = "exerciseId") String exerciseId) {
        return this.challengeService.deleteChallenge(exerciseId);
    }

    @GetMapping("/getListExerciseChallenge")
    public ResponseEntity getListExerciseChallenge(HttpServletRequest httpServletRequest) {
        return this.challengeService.getListExerciseChallenge(httpServletRequest);
    }
}
