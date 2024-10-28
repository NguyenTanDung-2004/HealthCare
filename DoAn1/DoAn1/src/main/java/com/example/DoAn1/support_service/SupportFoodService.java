package com.example.DoAn1.support_service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.hibernate.engine.internal.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import com.example.DoAn1.Model.DayMonthYear;
import com.example.DoAn1.Model.Meal;
import com.example.DoAn1.Model.RelatedFood;
import com.example.DoAn1.Model.Vote;
import com.example.DoAn1.entities.Food;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.status_food_excercise.StatusFoodExcerciseId;
import com.example.DoAn1.entities.status_food_excercise.UserStatus_Food_Excercise;
import com.example.DoAn1.entities.user_food.UserFood;
import com.example.DoAn1.entities.user_food.UserFoodId;
import com.example.DoAn1.entities.user_history.UserHistory;
import com.example.DoAn1.entities.user_history.UserHistoryId;
import com.example.DoAn1.entities.user_vote_food.UserVoteFood;
import com.example.DoAn1.entities.user_vote_food.UserVoteFoodId;
import com.example.DoAn1.exception.ExceptionCode;
import com.example.DoAn1.exception.ExceptionUser;
import com.example.DoAn1.repository.FoodRepository;
import com.example.DoAn1.repository.StatusFoodExcerciseRepository;
import com.example.DoAn1.repository.UserFoodRepository;
import com.example.DoAn1.repository.UserHistoryRepository;
import com.example.DoAn1.repository.UserRepository;
import com.example.DoAn1.repository.UserVoteFoodRepository;
import com.example.DoAn1.request.FoodEditRequest;
import com.example.DoAn1.request.UserCreateFoodRequest;
import com.example.DoAn1.response.ResponseFoodDetail;
import com.example.DoAn1.response.ResponseFoods;

import java.util.ArrayList;
import java.io.IOException;
import java.text.Normalizer;
import java.util.regex.Pattern;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import java.util.Set;
import java.util.HashSet;

@Component
public class SupportFoodService {
    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StatusFoodExcerciseRepository statusFoodExcerciseRepository;

    @Autowired
    private UserVoteFoodRepository userVoteFoodRepository;

    @Autowired
    private UserFoodRepository userFoodRepository;

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    public void updateFood(FoodEditRequest foodEditRequest, Food food) {
        // food.setName(foodEditRequest.getName());
        // food.setLevel(foodEditRequest.getLevel());
        // food.setMethod(foodEditRequest.getMethod());
        // food.setDiet(foodEditRequest.getDiet());
        // food.setCalories(foodEditRequest.getCalories());
        // food.setTime(foodEditRequest.getTime());
        // food.setType(foodEditRequest.getType());
        // food.setListIngredient(foodEditRequest.getListIngredient());
        // food.setListCaloriesIngredient(foodEditRequest.getListCaloriesIngredient());
        food.setListStep(foodEditRequest.getListStep());
        // food.setListLinkImage(foodEditRequest.getListLinkImage());
        food.setLinkVideo(foodEditRequest.getLinkVideo());
        // food.setCarb(foodEditRequest.getCarb());
        // food.setProtein(foodEditRequest.getProtein());
        // food.setFat(foodEditRequest.getFat());
        // food.setFlagBloodPressure(foodEditRequest.getFlagBloodPressure());
        // food.setFlagBloodGlucose(foodEditRequest.getFlagBloodGlucose());
        // food.setFlagHeart(foodEditRequest.getFlagHeart());
        // save
        this.foodRepository.save(food);
    }

    public Double createUserStatus(User user) {
        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate localDate1 = user.getDob().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        float BMI = 25 * createBMI(user.getHeight(), user.getWeight());
        float age = 15 * (localDate.getYear() - localDate1.getYear());
        float bloodPressure = 20 * user.getBloodPressure();
        float heSoHoatDong = 30 * user.getHeSoHoatDong();
        float hearBeat = 20 * user.getHearBeat();
        float bloodSugar = 25 * user.getBloodSugar();
        float gender = 10 * createGender(user.getGentle());

        return Math.sqrt(BMI * BMI + age * age + bloodPressure * bloodPressure + heSoHoatDong * heSoHoatDong
                + hearBeat * hearBeat + bloodSugar * bloodSugar + gender * gender);
    }

    private float createBMI(float height, float weight) {
        return weight / ((height / 100) * (height / 100));
    }

    private int createGender(String gender) {
        if (gender.equals("Female")) {
            return 0;
        } else if (gender.equals("Male")) {
            return 2;
        } else {
            return 1;
        }
    }

    public void addListFoodIdToStatusFoodExcercise(UserStatus_Food_Excercise status_Food_Excercise,
            List<String> foodId) {
        for (int i = 0; i < foodId.size(); i++) {
            status_Food_Excercise.getFoodId().add(foodId.get(i));
        }

        this.statusFoodExcerciseRepository.save(status_Food_Excercise);
    }

    public void addListFoodIdToUserLikedFood(User user,
            List<String> foodId) {
        for (int i = 0; i < foodId.size(); i++) {
            this.userRepository.insertUserLikeFood(user.getUserId(), foodId.get(i));
        }
    }

    public StatusFoodExcerciseId createStatusFoodExcerciseId(User user) {
        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate localDate1 = user.getDob().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        return StatusFoodExcerciseId.builder()
                .BMI(25 * createBMI(user.getHeight(), user.getWeight()))
                .age(15 * (localDate.getYear() - localDate1.getYear()))
                .bloodPressure(20 * user.getBloodPressure())
                .heSoHoatDong(user.getHeSoHoatDong() * 30)
                .heartBeat(user.getHearBeat() * 20)
                .bloodSugar(user.getBloodSugar() * 25)
                .gender(createGender(user.getGentle()) * 10)
                .build();
    }

    public void increaseNumberOfLikes(List<String> foodId) {
        for (int i = 0; i < foodId.size(); i++) {
            Food food = this.foodRepository.findById(foodId.get(i)).get();
            food.setNumberOfLikes(food.getNumberOfLikes() + 1);
            this.foodRepository.save(food);
        }
    }

    public ResponseFoodDetail createFoodDetail(Food food, User user) {
        return ResponseFoodDetail.builder()
                .type(food.getType())
                .name(food.getName())
                .calories(food.getCalories())
                .protein(food.getProtein())
                .fat(food.getFat())
                .carb(food.getCarb())
                .description(food.getDescriptionFood())
                .method(food.getMethod())
                .time(food.getTime())
                .level(food.getLevel())
                .diet(food.getDiet())
                .numberOfLikes(food.getNumberOfLikes())
                .listIngredient(food.getListIngredient())
                .listWeightIngredient(food.getListWeightIngredient())
                .listCaloriesIngredient(food.getListCaloriesIngredient())
                .linkVideo(food.getLinkVideo())
                .flagBloodPressure(food.getFlagBloodPressure())
                .flagBloodGlucose(food.getFlagBloodGlucose())
                .flagHeart(food.getFlagHeart())
                .listLinkImage(createListLinkImage(food.getName())) // list link image
                .stars(createStars(food.getId())) // stars
                .relatedFoods(createListRelatedFoods(food)) // related food
                // list link image
                // stars
                // related food
                .flagLiked(creatFlagLiked(food.getId(), user.getUserId()))
                .build();
    }

    public int creatFlagLiked(String foodId, String userId) {
        return this.foodRepository.likedFood(userId, foodId);
    }

    public List<String> createListLinkImage(String foodName) {
        List<String> list = new ArrayList<>();
        String prefixString = "http://localhost:8080/FoodImages";
        String formattedFoodName = convertToNoAccent(foodName);
        List<String> listFileNames = getAllFileInFolder(formattedFoodName);

        for (int i = 0; i < listFileNames.size(); i++) {
            list.add(prefixString + "/" + formattedFoodName + "/" + listFileNames.get(i));
        }

        return list;
    }

    public Set<RelatedFood> createListRelatedFoods(Food food) {
        Set<RelatedFood> set = new HashSet<>();
        // according type
        List<Food> listType = this.foodRepository.getFoodAccordingToType(food.getType(), food.getId());
        boolean bool = createRelatedFoodFromFoodAndAddToList(listType, set);
        if (bool == false) {
            List<Food> listDiet = this.foodRepository.getFoodAccordingToType(food.getDiet(), food.getId());
            boolean bool1 = createRelatedFoodFromFoodAndAddToList(listDiet, set);
            if (bool1 == false) {
                List<Food> listMethod = this.foodRepository.getFoodAccordingToType(food.getMethod(), food.getId());
                boolean bool2 = createRelatedFoodFromFoodAndAddToList(listMethod, set);
            }
        }
        return set;
    }

    public boolean createRelatedFoodFromFoodAndAddToList(List<Food> listFoods, Set<RelatedFood> setRelatedFood) {
        if (setRelatedFood.size() == 5) {
            return true;
        } else {
            int remainderFoods = 5 - setRelatedFood.size();
            for (int i = 0; i < listFoods.size() && i < remainderFoods; i++) {
                setRelatedFood.add(createRelatedFoodFromFood(listFoods.get(i)));
            }
            if (setRelatedFood.size() == 5) {
                return true;
            } else {
                return false;
            }
        }
    }

    public RelatedFood createRelatedFoodFromFood(Food food) {
        String linkImage = "http://localhost:8080/FoodImages/" + convertToNoAccent(food.getName()) + "/remove.png";
        return RelatedFood.builder()
                .name(food.getName())
                .linkImage(linkImage)
                .stars(createStars(food.getId()))
                .build();
    }

    // Phương thức để bỏ dấu và nối các từ lại
    public String convertToNoAccent(String str) {
        // Bỏ dấu
        String normalizedString = Normalizer.normalize(str, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String noAccentString = pattern.matcher(normalizedString).replaceAll("");

        // Chia chuỗi thành các từ
        String[] words = noAccentString.split(" ");

        // Viết hoa chữ cái đầu mỗi từ và nối lại
        StringBuilder result = new StringBuilder();
        for (String word : words) {
            if (word.length() > 0) {
                result.append(Character.toUpperCase(word.charAt(0))); // Chữ cái đầu tiên in hoa
                result.append(word.substring(1).toLowerCase()); // Phần còn lại in thường
            }
        }

        return result.toString();
    }

    public List<String> getAllFileInFolder(String foodName) {
        // Using PathMatchingResourcePatternResolver to match all files in the folder
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();

        // This is the path for files inside the static folder
        Resource[] resources = null;
        try {
            resources = resolver.getResources("classpath:static/FoodImages/" + foodName + "/*");
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

    public float createStars(String foodId) {
        List<UserVoteFood> listUserVoteFoods = this.userVoteFoodRepository.getListUserVoteFood(foodId);

        if (listUserVoteFoods == null) {
            return 0;
        } else {
            if (listUserVoteFoods.size() == 0) {
                return 0;
            } else {
                int numberOfStars = 0;
                for (int i = 0; i < listUserVoteFoods.size(); i++) {
                    numberOfStars = numberOfStars + listUserVoteFoods.get(i).getStars();
                }
                return numberOfStars / listUserVoteFoods.size();
            }
        }
    }

    public void insert1VoteFood(Vote voteFood, User user) {
        UserVoteFoodId userVoteFoodId = UserVoteFoodId.builder()
                .userId(user.getUserId())
                .foodId(voteFood.getId())
                .build();
        UserVoteFood userVoteFood = UserVoteFood.builder()
                .id(userVoteFoodId)
                .stars(voteFood.getStars())
                .user(user)
                .food(this.foodRepository.findById(voteFood.getId()).get())
                .build();
        this.userVoteFoodRepository.save(userVoteFood);
    }

    public void insertVoteFood(List<Vote> listVoteFood, User user) {
        for (int i = 0; i < listVoteFood.size(); i++) {
            insert1VoteFood(listVoteFood.get(i), user);
        }
    }

    public ResponseFoods createResponseFoodFromFood(Food food) {
        return ResponseFoods.builder()
                .name(food.getName())
                .type(food.getType())
                .removeImage(createRemoveImage(food.getName()))
                .time(food.getTime())
                .calories(food.getCalories())
                .numberOfLikes(food.getNumberOfLikes())
                .stars(createStars(food.getId()))
                .id(food.getId())
                .build();
    }

    public List<ResponseFoods> createResponseFoodBasedOnPage(int page) {
        List<Food> listFoods = this.foodRepository.getFoodsBasedOnPage(8, 8 * page);
        List<ResponseFoods> listResponseFoods = new ArrayList<>();
        for (int i = 0; i < listFoods.size(); i++) {
            listResponseFoods.add(createResponseFoodFromFood(listFoods.get(i)));
        }
        return listResponseFoods;
    }

    public String createRemoveImage(String foodName) {
        return "http://localhost:8080/FoodImages/" + convertToNoAccent(foodName) + "/remove.png";
    }

    public List<ResponseFoods> createResponseAllFood() {
        List<Food> listFoods = this.foodRepository.findAll();
        List<ResponseFoods> listResponseFoods = new ArrayList<>();
        for (int i = 0; i < listFoods.size(); i++) {
            listResponseFoods.add(createResponseFoodFromFood(listFoods.get(i)));
        }
        return listResponseFoods;
    }

    // check if food name is exist
    public boolean checkFoodName(String userId, String foodName) {
        int numberOfRows = this.userFoodRepository.checkFoodName(userId, foodName);
        if (numberOfRows == 0) {
            return true;
        } else {
            throw new ExceptionUser(ExceptionCode.FoodNameIsExist);
        }
    }

    public void saveFoodInUserFood(UserCreateFoodRequest userCreateFoodRequest, String userId) {
        UserFood userFood = UserFood.builder()
                .userFoodId(UserFoodId.builder()
                        .userId(userId)
                        .userFoodName(userCreateFoodRequest.getName())
                        .build())
                .weight(userCreateFoodRequest.getWeight())
                .calories(userCreateFoodRequest.getCalories())

                .protein(userCreateFoodRequest.getProtein())
                .carb(userCreateFoodRequest.getCarb())
                .fat(userCreateFoodRequest.getFat())
                .build();
        this.userFoodRepository.save(userFood);
    }

    public void saveFoodInUserHistory(String userId, UserCreateFoodRequest userCreateFoodRequest) {
        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        UserHistory userHistory = UserHistory.builder()
                .userHistoryId(UserHistoryId.builder()
                        .day(localDate.getDayOfMonth())
                        .month(localDate.getMonthValue())
                        .year(localDate.getYear())
                        .userId(userId)
                        .build())
                .build();
        if (userHistory.getListFoodNames() == null) {
            userHistory.setListFoodNames(new ArrayList<>());
            userHistory.setListFlags(new ArrayList<>());
        }
        userHistory.getListFoodNames().add(userCreateFoodRequest.getName());
        userHistory.getListFlags().add(userCreateFoodRequest.getFlag());
        this.userHistoryRepository.save(userHistory);
    }

}
