package com.example.DoAn1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import com.example.DoAn1.Model.Vote;
import com.example.DoAn1.repository.ExerciseRepository;
import com.example.DoAn1.request.ExcerciseCreationRequest;
import com.example.DoAn1.service.ExerciseService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/exercise")
public class ExcerciseController {
    @Autowired
    private ExerciseService exerciseService;

    @PostMapping("/addExercise")
    public ResponseEntity addExcercise(@RequestBody List<ExcerciseCreationRequest> list) {
        return exerciseService.addExercise(list);
        // return null;
    }

    @Autowired
    private ExerciseRepository exerciseRepository;

    @GetMapping("/getExercise")
    public ResponseEntity getExercise() {
        return ResponseEntity.ok().body(exerciseRepository.findAll());
    }

    @PostMapping("/likeExcercise")
    public ResponseEntity likeExcercise(HttpServletRequest httpServletRequest, @RequestBody List<String> excerciseId) {
        return this.exerciseService.likeExcercise(httpServletRequest, excerciseId);
    }

    @PostMapping("/voteExercise")
    public ResponseEntity voteFood(@RequestBody List<Vote> voteExcercise, HttpServletRequest httpServletRequest) {
        return this.exerciseService.voteExercise(voteExcercise, httpServletRequest);
    }

    @GetMapping("/getExercises")
    public ResponseEntity getExercises(@RequestParam(name = "page") int page, HttpServletRequest httpServletRequest) {
        return this.exerciseService.getExercises(page, httpServletRequest);
    }

    @GetMapping("/getAllExercises")
    public ResponseEntity getExercises(HttpServletRequest httpServletRequest) {
        return this.exerciseService.getExercises(httpServletRequest);
    }

    @GetMapping("/getExerciseDetails")
    public ResponseEntity getExerciseDetail(@RequestParam(name = "exerciseId") String exerciseId,
            HttpServletRequest httpServletRequest) {
        return this.exerciseService.getExerciseDetail(exerciseId, httpServletRequest);
    }

    // manage exercise
    @PostMapping("/createExercise")
    public ResponseEntity createExercise(@RequestBody ExcerciseCreationRequest excerciseCreationRequest) {
        return this.exerciseService.createExercise(excerciseCreationRequest);
    }

    @PostMapping("/createExerciseImages")
    public ResponseEntity createExerciseImages(@RequestParam(name = "listImages") MultipartFile[] multipartFiles,
            @RequestParam(name = "remove") MultipartFile multipartFile, @RequestParam(name = "id") String id) {
        return this.exerciseService.createExerciseImages(multipartFiles, multipartFile, id);
    }

    @PostMapping("/updateExercise")
    public ResponseEntity updateExercise(@RequestBody ExcerciseCreationRequest excerciseCreationRequest,
            @RequestParam(name = "exerciseId") String exerciseId) {
        return this.exerciseService.updateExercise(excerciseCreationRequest, exerciseId);
    }

    @PostMapping("/updateExerciseImages")
    public ResponseEntity updateExerciseImage(
            @RequestParam(name = "listNormalImages", required = false) MultipartFile[] listNormalImages, // image
            @RequestParam(name = "removedImage", required = false) MultipartFile removedImage,
            @RequestParam(name = "exerciseId") String exerciseId, @RequestParam(name = "flagList") int flagList,
            @RequestParam(name = "flagRemove") int flagRemove) {
        // 1 - update, 0 - none
        return this.exerciseService.updateExerciseImage(listNormalImages, removedImage, exerciseId, flagList,
                flagRemove);
    }

    @PostMapping("/deleteExercise")
    public ResponseEntity deleteExercise(@RequestParam(name = "exerciseId") String exerciseId) {
        return this.exerciseService.deleteExercise(exerciseId);
    }
}
