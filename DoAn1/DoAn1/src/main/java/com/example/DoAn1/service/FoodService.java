package com.example.DoAn1.service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.DoAn1.Model.Vote;
import com.example.DoAn1.entities.Food;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.status_food_excercise.StatusFoodExcerciseId;
import com.example.DoAn1.entities.status_food_excercise.UserStatus_Food_Excercise;
import com.example.DoAn1.entities.user_food.UserFood;
import com.example.DoAn1.exception.ExceptionCode;
import com.example.DoAn1.exception.ExceptionUser;
import com.example.DoAn1.mapper.FoodMapper;
import com.example.DoAn1.repository.FoodRepository;
import com.example.DoAn1.repository.StatusFoodExcerciseRepository;
import com.example.DoAn1.repository.UserFoodRepository;
import com.example.DoAn1.repository.UserRepository;
import com.example.DoAn1.request.FoodCreationRequest;
import com.example.DoAn1.request.FoodEditRequest;
import com.example.DoAn1.request.UserCreateFoodRequest;
import com.example.DoAn1.response.ResponseCode;
import com.example.DoAn1.response.ResponseFoodDetail;
import com.example.DoAn1.response.ResponseFoodDetailInSystem;
import com.example.DoAn1.response.ResponseFoods;
import com.example.DoAn1.response.ResponseUserFood;
import com.example.DoAn1.support_service.SupportFoodService;
import com.example.DoAn1.support_service.SupportUserService;
import com.example.DoAn1.utils.UtilsHandleFile;
import com.example.DoAn1.utils.UtilsHandleJwtToken;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

@Service
public class FoodService {
    @Autowired
    private FoodMapper foodMapper;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private SupportFoodService supportFoodService;

    @Autowired
    private SupportUserService supportUserService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private StatusFoodExcerciseRepository statusFoodExcerciseRepository;

    @Autowired
    private UserFoodRepository userFoodRepository;

    @Autowired
    private UtilsHandleFile utilsHandleFile;

    public ResponseEntity createFood(FoodCreationRequest foodCreationRequest) {
        // check name
        if (this.foodRepository.checkFoodByName(foodCreationRequest.getName()) > 0) {
            throw new ExceptionUser(ExceptionCode.FoodNameIsExist);
        }
        Food food = this.foodMapper.convertRequest(foodCreationRequest);
        food = this.foodRepository.save(food);
        return ResponseEntity.ok().body(food.getId());
    }

    public ResponseEntity editFood(FoodEditRequest foodEditRequest) {
        Food food = this.foodRepository.findById(foodEditRequest.getFoodId()).get();
        // update
        this.supportFoodService.updateFood(foodEditRequest, food);
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.UpdateFood));
    }

    public ResponseEntity likeFood(HttpServletRequest httpServletRequest, List<String> listFoodId) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        // create status_food_excercise id
        StatusFoodExcerciseId id = this.supportFoodService.createStatusFoodExcerciseId(user);
        System.out.println(id);
        // get Row UserStatus_Food_Excercise by user status
        Optional<UserStatus_Food_Excercise> opt = this.statusFoodExcerciseRepository.findById(id);
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
        this.supportFoodService.addListFoodIdToUserLikedFood(user, listFoodId);
        // add foodId into UserStatus_Food_Excercise
        this.supportFoodService.addListFoodIdToStatusFoodExcercise(status_Food_Excercise,
                listFoodId);
        // increase number of likes
        this.supportFoodService.increaseNumberOfLikes(listFoodId);

        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.LikeFood));
    }

    public ResponseEntity getFoodDetail(String foodId, HttpServletRequest httpServletRequest) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        // get food by Id
        Food food = this.foodRepository.findById(foodId).get();
        // create response food detail
        ResponseFoodDetail responseFoodDetail = this.supportFoodService.createFoodDetail(food, user);

        return ResponseEntity.ok().body(responseFoodDetail);
    }

    public ResponseEntity voteFood(List<Vote> foodId, HttpServletRequest httpServletRequest) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        this.supportFoodService.insertVoteFood(foodId, user);

        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.VoteFood));
    }

    public ResponseEntity getFoods(int page) {
        // get foods
        List<ResponseFoods> listResponseFoods = this.supportFoodService.createResponseFoodBasedOnPage(page);
        return ResponseEntity.ok().body(listResponseFoods);
    }

    public ResponseEntity getAllFood() {
        List<ResponseFoods> listResponseFoods = this.supportFoodService.createResponseAllFood();
        return ResponseEntity.ok().body(listResponseFoods);
    }

    public ResponseEntity getFoodInfoInSystem(HttpServletRequest httpServletRequest, String foodId) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        // get food
        Food food = this.foodRepository.findById(foodId).get();
        // create Response
        ResponseFoodDetailInSystem responseFoodDetailInSystem = ResponseFoodDetailInSystem.builder()
                .weight(user.getWeight())
                .height(user.getHeight())
                .calories((float) food.getCalories())
                .carb((float) food.getCarb())
                .protein((float) food.getProtein())
                .fat((float) food.getFat())
                .walking(4)
                .running(9)
                .skipping(8)
                .swimming(10)
                .riding(8)
                .build();
        // return
        return ResponseEntity.ok().body(responseFoodDetailInSystem);
    }

    public ResponseEntity userCreateFood(HttpServletRequest httpServletRequest,
            UserCreateFoodRequest userCreateFoodRequest) {
        // get user
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        User user = this.userRepository.findById(userId).get();
        // check food name
        if (this.supportFoodService.checkFoodName(userId, userCreateFoodRequest.getName())) {
            // save in user food
            this.supportFoodService.saveFoodInUserFood(userCreateFoodRequest, userId);
            // save in user history, // update current calories, current fat, current carb,
            // current protein.
            this.supportFoodService.saveFoodInUserHistory(userId, userCreateFoodRequest);
        }

        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.UserCreateFood));
    }

    public ResponseEntity getListUserFood(HttpServletRequest httpServletRequest) {
        // get userId
        String jwtToken = this.supportUserService.getCookie(httpServletRequest, "jwtToken");
        String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
        // get list user food
        List<UserFood> listUserFood = this.userFoodRepository.getListUserFood(userId);
        // convert response user food
        List<ResponseUserFood> listResponseUserFoods = new ArrayList<>();
        for (int i = 0; i < listUserFood.size(); i++) {
            ResponseUserFood responseUserFood = ResponseUserFood.builder()
                    .name(listUserFood.get(i).getUserFoodId().getUserFoodName())
                    .calories(listUserFood.get(i).getCalories())
                    .protein(listUserFood.get(i).getProtein())
                    .fat(listUserFood.get(i).getFat())
                    .carb(listUserFood.get(i).getCarb())
                    .weight(listUserFood.get(i).getWeight())
                    .build();
            listResponseUserFoods.add(responseUserFood);
        }
        // return
        return ResponseEntity.ok().body(listResponseUserFoods);
    }

    public ResponseEntity createImageForFood(MultipartFile[] listNormalImages, MultipartFile removedImage,
            String foodId) {
        // get food
        Food food = this.foodRepository.findById(foodId).get();
        // create folder
        this.utilsHandleFile.createFolder(this.utilsHandleFile.getPathOfStatic() + "/FoodImages",
                this.supportFoodService.convertToNoAccent(food.getName()));
        // saved normal file
        for (int i = 0; i < listNormalImages.length; i++) {
            this.utilsHandleFile.saveFile(listNormalImages[i],
                    this.utilsHandleFile.getPathOfStatic() + "/FoodImages/"
                            + this.supportFoodService.convertToNoAccent(food.getName()),
                    (i + 1) + ".png", 2);
        }

        // saved file
        this.utilsHandleFile.saveFile(removedImage, this.utilsHandleFile.getPathOfStatic() + "/FoodImages/"
                + this.supportFoodService.convertToNoAccent(food.getName()), "remove.png", 1);

        // return
        return ResponseEntity.ok().body(ResponseCode.UpdateFood);
    }

    public ResponseEntity updateFood(String foodId, FoodCreationRequest foodCreationRequest) {
        Food food = this.foodRepository.findById(foodId).get();
        // get name
        String name = food.getName();
        // check food name
        if (food.getName().equals(foodCreationRequest.getName()) == false
                && this.foodRepository.checkFoodByName(foodCreationRequest.getName()) > 0) {
            throw new ExceptionUser(ExceptionCode.FoodNameIsExist);
        }
        // create new food through mapper
        Food food1 = FoodMapper.convertRequest(foodCreationRequest);
        food1.setId(foodId);
        // update
        this.foodRepository.save(food1);
        // rename folder
        this.utilsHandleFile.renameFolder(this.utilsHandleFile.getPathOfStatic() + "/FoodImages",
                this.supportFoodService.convertToNoAccent(name),
                this.supportFoodService.convertToNoAccent(foodCreationRequest.getName()));
        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.UpdateFood));
    }

    public ResponseEntity updateFoodImage(MultipartFile[] listNormalImages, MultipartFile removedImage, String foodId,
            int flagList, int flagRemove) {
        // get food
        Food food = this.foodRepository.findById(foodId).get();
        // update list image
        if (flagList == 1) {
            List<String> listFileName = this.supportFoodService
                    .getAllFileInFolder(this.supportFoodService.convertToNoAccent(food.getName()));
            // delete file
            for (int i = 0; i < listFileName.size(); i++) {
                if (this.supportFoodService.checkRemoveImage(listFileName.get(i)) == false) {
                    this.utilsHandleFile.delete1File(this.utilsHandleFile.getPathOfStatic() + "/FoodImages/"
                            + this.supportFoodService.convertToNoAccent(food.getName()) + "/" + listFileName.get(i));
                }
            }
            // save file
            for (int i = 0; i < listNormalImages.length; i++) {
                this.utilsHandleFile.saveFile(listNormalImages[i],
                        this.utilsHandleFile.getPathOfStatic() + "/FoodImages/"
                                + this.supportFoodService.convertToNoAccent(food.getName()),
                        (i + 1) + ".png", 2);
            }
        }
        // update remove
        this.utilsHandleFile.saveFile(removedImage, this.utilsHandleFile.getPathOfStatic() + "/FoodImages/"
                + this.supportFoodService.convertToNoAccent(food.getName()), "remove.png", 1);

        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.UpdateFood));
    }

    @Transactional
    public ResponseEntity deleteFoodId(String foodId) {
        // get food
        Food food = this.foodRepository.findById(foodId).get();
        // // delete food
        foodRepository.deleteUserLikeFood(foodId);
        foodRepository.deleteUserVoteFood(foodId);
        foodRepository.deleteById(foodId);
        // return
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.DeleteFood));
    }

}
