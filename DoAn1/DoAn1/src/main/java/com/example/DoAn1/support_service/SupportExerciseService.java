package com.example.DoAn1.support_service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import com.example.DoAn1.Model.Vote;
import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.status_food_excercise.UserStatus_Food_Excercise;
import com.example.DoAn1.entities.user_vote_excercise.UserVoteExcercise;
import com.example.DoAn1.entities.user_vote_excercise.UserVoteExcerciseId;
import com.example.DoAn1.entities.user_vote_food.UserVoteFood;
import com.example.DoAn1.mapper.ExcerciseMapper;
import com.example.DoAn1.repository.ExerciseRepository;
import com.example.DoAn1.repository.StatusFoodExcerciseRepository;
import com.example.DoAn1.repository.UserRepository;
import com.example.DoAn1.repository.UserVoteExerciseRepository;
import com.example.DoAn1.request.ExcerciseCreationRequest;
import com.example.DoAn1.response.ResponseExerciseDetail;
import com.example.DoAn1.response.ResponseExercises;
import com.example.DoAn1.utils.UtilsHandleFile;
import java.util.Map;
import java.io.File;
import java.io.IOException;

@Component
public class SupportExerciseService {
    @Autowired
    private UtilsHandleFile utilsHandleFile;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StatusFoodExcerciseRepository statusFoodExcerciseRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private UserVoteExerciseRepository userVoteExerciseRepository;

    @Autowired
    private SupportFoodService supportFoodService;

    public void save1Exercise(ExerciseRepository exerciseRepository,
            ExcerciseCreationRequest excerciseCreationRequest, ExcerciseMapper excerciseMapper, int index,
            Map<Integer, File> map) {
        Excercise excercise = excerciseMapper.convertRequest(excerciseCreationRequest);
        // create list image
        List<String> listImages = this.utilsHandleFile.createListImage(index, map, excercise.getType());
        // set listImage for exercise
        excercise.setListImages(listImages);
        excercise.setNumberOfLikes(0);
        // save
        exerciseRepository.save(excercise);
    }

    public void addListExcerciseIdToStatusFoodExcercise(UserStatus_Food_Excercise status_Food_Excercise,
            List<String> excerciseId) {
        for (int i = 0; i < excerciseId.size(); i++) {
            status_Food_Excercise.getExcerciseId().add(excerciseId.get(i));
        }

        this.statusFoodExcerciseRepository.save(status_Food_Excercise);
    }

    public void addListExcerciseIdToUserLikedExcercise(User user,
            List<String> excerciseId) {
        for (int i = 0; i < excerciseId.size(); i++) {
            this.userRepository.insertUserLikeExcercise(user.getUserId(), excerciseId.get(i));
        }
    }

    public void increaseNumberOfLikes(List<String> excerciseId) {
        for (int i = 0; i < excerciseId.size(); i++) {
            Excercise excercise = this.exerciseRepository.findById(excerciseId.get(i)).get();
            excercise.setNumberOfLikes(excercise.getNumberOfLikes() + 1);
            this.exerciseRepository.save(excercise);
        }
    }

    public void insert1VoteExercise(Vote voteExercise, User user) {
        UserVoteExcerciseId UserVoteExcerciseId = com.example.DoAn1.entities.user_vote_excercise.UserVoteExcerciseId
                .builder()
                .userId(user.getUserId())
                .excerciseId(voteExercise.getId())
                .build();
        UserVoteExcercise userVoteFood = UserVoteExcercise.builder()
                .id(UserVoteExcerciseId)
                .stars(voteExercise.getStars())
                .user(user)
                .excercise(this.exerciseRepository.findById(voteExercise.getId()).get())
                .build();
        this.userVoteExerciseRepository.save(userVoteFood);
    }

    public void insertVoteFood(List<Vote> listVoteExercise, User user) {
        for (int i = 0; i < listVoteExercise.size(); i++) {
            insert1VoteExercise(listVoteExercise.get(i), user);
        }
    }

    public ResponseExercises creatResponseExercisesFromExercise(Excercise excercise, User user) {
        return ResponseExercises.builder()
                .calories(createCaloriesBasedOnMet(excercise, user))
                .name(excercise.getName())
                .linkImage(createLinkImageInAllExercise(excercise))
                .stars(createStars(excercise.getId()))
                .time(excercise.getTime()) // s
                .exerciseId(excercise.getId())
                .build();
    }

    public void createListResponseExercises(List<Excercise> list, User user,
            List<ResponseExercises> listResponseExercises) {
        for (int i = 0; i < list.size(); i++) {
            ResponseExercises responseExercises = creatResponseExercisesFromExercise(list.get(i), user);
            listResponseExercises.add(responseExercises);
        }
    }

    public String createLinkImageInAllExercise(Excercise excercise) {
        return "http://localhost:8080/ExcerciseImages/" + this.supportFoodService.convertToNoAccent(excercise.getName())
                + "/Remove.png";
    }

    public int createCaloriesBasedOnMet(Excercise excercise, User user) {
        return (int) ((user.getWeight() * excercise.getMet() * excercise.getTime()) / 3600);
    }

    public float createStars(String exerciseId) {
        List<UserVoteExcercise> listUserVoteExcercises = this.userVoteExerciseRepository
                .getListUserVoteExercise(exerciseId);

        if (listUserVoteExcercises == null) {
            return 0;
        } else {
            if (listUserVoteExcercises.size() == 0) {
                return 0;
            } else {
                int numberOfStars = 0;
                for (int i = 0; i < listUserVoteExcercises.size(); i++) {
                    numberOfStars = numberOfStars + listUserVoteExcercises.get(i).getStars();
                }
                return numberOfStars / listUserVoteExcercises.size();
            }
        }
    }

    public ResponseExerciseDetail createResponseExerciseDetail(User user, Excercise excercise) {
        List<ResponseExercises> listResponseExercises = new ArrayList<>();
        List<Excercise> listExcercises = this.exerciseRepository.getListRelatedExercise(excercise.getType());
        createListResponseExercises(listExcercises, user, listResponseExercises);
        return ResponseExerciseDetail.builder()
                .type(excercise.getType())
                .stars(createStars(excercise.getId()))
                .name(excercise.getName())
                .flagLiked(creatFlagLiked(excercise.getId(), user.getUserId()))
                .met(excercise.getMet())
                .time(excercise.getTime())
                .calories(createCaloriesBasedOnMet(excercise, user))
                .listHanChe(excercise.getListHanChe())
                .linkVideo(excercise.getLinkVideo())
                .linkImages(createListLinkImage(excercise)) // list link image
                .listRelatedExercises(listResponseExercises) // list related exercise
                // list link images
                // list related exercise
                .build();
    }

    public int creatFlagLiked(String exerciseId, String userId) {
        return this.exerciseRepository.likedExercise(userId, exerciseId);
    }

    public List<String> createListLinkImage(Excercise excercise) {
        List<String> list = new ArrayList<>();
        for (int i = 0; i < excercise.getListImages().size(); i++) {
            list.add("http://localhost:8080/" + excercise.getListImages().get(i).replace("\\", "/"));
        }
        String s = excercise.getListImages().get(0).replace("\\", "/");
        s = s.substring(0, s.length() - 5);
        s = "http://localhost:8080/" + s + "Remove.png";
        list.add(s);
        return list;
    }

    public List<String> getAllFileInFolder(String foodName) {
        // Using PathMatchingResourcePatternResolver to match all files in the folder
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();

        // This is the path for files inside the static folder
        Resource[] resources = null;
        try {
            resources = resolver.getResources("classpath:static/ExcerciseImages/" + foodName + "/*");
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        List<String> list = new ArrayList<>();
        // Iterate over the resources and print file names
        for (Resource resource : resources) {
            list.add(resource.getFilename());
        }

        return list;
    }
}
