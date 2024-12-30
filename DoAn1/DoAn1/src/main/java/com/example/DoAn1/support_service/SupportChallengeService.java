package com.example.DoAn1.support_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.DoAn1.Model.Top3Exercise;
import com.example.DoAn1.Model.UserInRank;
import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.user_challenge.UserChallenge;
import com.example.DoAn1.entities.user_challenge.UserChallengeId;
import com.example.DoAn1.repository.ChallengeRepository;
import com.example.DoAn1.repository.UserChallengeRepository;
import com.example.DoAn1.repository.UserRepository;
import com.example.DoAn1.response.ResponseExerciseChallenge;
import com.example.DoAn1.response.ResponseExercises;
import com.example.DoAn1.response.ResponseRankData;
import com.example.DoAn1.utils.UtilsHandleFile;

import java.io.ByteArrayInputStream;
import java.io.File;
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

    @Autowired
    private UtilsHandleFile utilsHandleFile;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private SupportFoodService supportFoodService;

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

    public ResponseRankData createResponseRankData(User user) {
        return ResponseRankData.builder()
                // user
                .linkImage(createUserImage(user.getUserId()))
                .currentRank(this.userRepository.getRankOfUser(user.getUserId()))
                .maxRank(this.userRepository.getMaxRank())
                .currentPoint(user.getPoint())
                // top 3 exercise
                .top3Exercise(createListTop3Exercises())
                // list user in ranks
                .listUserInRanks(createListUserInRanks())
                .build();
    }

    public String createUserImage(String userId) {
        String folderPath = this.utilsHandleFile.getPathOfStatic();
        File f = new File(folderPath + "/UserImages/" + userId + ".png");
        if (f.exists()) {
            return "http://localhost:8080/UserImages/" + userId + ".png";
        } else {
            return "http://localhost:8080/UserImages/Default.png";
        }
    }

    public List<Top3Exercise> createListTop3Exercises() {
        // get point, name in database
        List<Object[]> list = this.challengeRepository.getTop3Exercise();
        // convert to top3 exercise
        List<Top3Exercise> listTop3Exercise = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            Top3Exercise top3Exercise = Top3Exercise.builder()
                    .numberOfUsers((int) list.get(i)[0])
                    .linkRemovedImage(createLinkRemove((String) list.get(i)[1]))
                    .name((String) list.get(i)[1])
                    .build();
            listTop3Exercise.add(top3Exercise);
        }
        // return
        return listTop3Exercise;
    }

    public List<UserInRank> createListUserInRanks() {
        // get userId, name, weight, height, point, rank from database
        List<Object[]> list = this.challengeRepository.getListUserInRank();
        // convert to rank
        List<UserInRank> listUserInRanks = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            listUserInRanks.add(objectToUserInRank(list.get(i)));
        }
        // return
        return listUserInRanks;
    }

    public UserInRank objectToUserInRank(Object[] object) {
        return UserInRank.builder()
                .linkImage(createUserImage((String) object[0]))
                .name((String) object[1])
                .BMI((float) object[2] / (((float) object[3] / 100) * ((float) object[3] / 100)))
                .currentPoint((int) object[4])
                .rank(((Long) object[5]))
                .build();
    }

    public String createLinkRemove(String exerciseName) {
        return "http://localhost:8080/ExcerciseImages/" + this.supportFoodService.convertToNoAccent(exerciseName)
                + "/Remove.png";
    }
}
