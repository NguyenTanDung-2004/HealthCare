package com.example.DoAn1.support_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.user_challenge.UserChallenge;
import com.example.DoAn1.entities.user_challenge.UserChallengeId;
import com.example.DoAn1.repository.UserChallengeRepository;
import com.example.DoAn1.response.ResponseExerciseChallenge;
import com.example.DoAn1.response.ResponseExercises;

import java.io.ByteArrayInputStream;
import java.io.ObjectInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class SupportChallengeService {
    @Autowired
    private SupportExerciseService supportExerciseService;

    @Autowired
    private UserChallengeRepository userChallengeRepository;

    public List<ResponseExerciseChallenge> creaResponseExerciseChallenges(List<Excercise> listExcercises,
            List<Integer> listPoints, User user) {
        List<ResponseExerciseChallenge> list = new ArrayList<>();
        // iterate
        for (int i = 0; i < listExcercises.size(); i++) {
            list.add(creatResponseExerciseChallenge(listExcercises.get(i), listPoints.get(i), user));
        }
        // return
        return list;
    }

    private ResponseExerciseChallenge creatResponseExerciseChallenge(Excercise excercise, Integer point, User user) {
        ResponseExercises responseExercises = this.supportExerciseService.creatResponseExercisesFromExercise(excercise,
                user);
        // get number of practices
        int numberOfPractices = 0;
        UserChallengeId userChallengeId = UserChallengeId.builder()
                .exerciseId(excercise.getId())
                .userId(user.getUserId())
                .build();
        Optional<UserChallenge> optional = this.userChallengeRepository.findById(userChallengeId);
        if (optional.isPresent()) {
            numberOfPractices = optional.get().getNumber();
        }

        // create creatResponseExerciseChallenge
        ResponseExerciseChallenge responseExerciseChallenge = ResponseExerciseChallenge.builder()
                .linkImage(responseExercises.getLinkImage())
                .calories(responseExercises.getCalories())
                .name(responseExercises.getName())
                .stars(responseExercises.getStars())
                .time(responseExercises.getTime())
                .exerciseId(responseExercises.getExerciseId())
                .numberOfPractice(numberOfPractices)
                .numberOfUsers(this.userChallengeRepository.countNumberOfUsers(excercise.getId()))
                .point(point)
                .build();

        // return
        return responseExerciseChallenge;
    }

    // Example method to deserialize a byte array back into a List<String>
    public List<String> deserializeList(byte[] data) {
        if (data == null) {
            return new ArrayList<>();
        }
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(data))) {
            return (List<String>) ois.readObject(); // Assuming you serialized your List<String>
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>(); // Return an empty list in case of error
        }
    }
}
