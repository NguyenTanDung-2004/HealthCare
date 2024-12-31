package com.example.DoAn1.support_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.DoAn1.Model.DayMonthYear;
import com.example.DoAn1.Model.ExerciseInReport;
import com.example.DoAn1.Model.SavedFood;
import com.example.DoAn1.Model.year_report.CaloriesChart;
import com.example.DoAn1.Model.year_report.ExerciseChart;
import com.example.DoAn1.Model.year_report.FatCarbProteinChart;
import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.Food;
import com.example.DoAn1.entities.User;
import com.example.DoAn1.entities.user_food.UserFood;
import com.example.DoAn1.entities.user_history.UserHistory;
import com.example.DoAn1.repository.ExerciseRepository;
import com.example.DoAn1.repository.UserHistoryRepository;
import com.example.DoAn1.request.RequestDeleteFoodInMeal;
import com.example.DoAn1.request.RequestUpdateFoodIn1Meal;
import com.example.DoAn1.response.ResponseDateReport;
import com.example.DoAn1.response.ResponseFoodInMeal;
import com.example.DoAn1.response.ResponseNutritionProfile;
import com.example.DoAn1.response.ResponseWeeklyReport;
import com.example.DoAn1.response.ResponseYearReport;
import com.example.DoAn1.utils.UtilsHandleJson;

import java.util.Map;
import java.util.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.ArrayList;

@Component
public class SupportUserHistoryService {
    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    public void addExercise(String exerciseId, UserHistory userHistory) {
        Map<String, Integer> map = userHistory.getExercisesFromExerciseJson();
        if (map.get(exerciseId) == null) {
            map.put(exerciseId, 1);
        } else {
            map.put(exerciseId, map.get(exerciseId) + 1);
        }
        userHistory.setExerciseJsonFromExercises(map);
    }

    public DayMonthYear getCurrentDayMonthYear() {
        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return DayMonthYear.builder()
                .day(localDate.getDayOfMonth())
                .month(localDate.getMonthValue())
                .year(localDate.getYear())
                .build();
    }

    public void updateCurrentBurned(float currentBurned, UserHistory userHistory) {
        if (userHistory.getCurrentBurned() == null) {
            userHistory.setCurrentBurned(currentBurned);
        } else {
            userHistory.setCurrentBurned(userHistory.getCurrentBurned() + currentBurned);
        }
    }

    public float caculateCaloriesBasedOnMet(User user, Excercise excercise) {
        return (float) ((user.getWeight() * excercise.getMet() * excercise.getTime()) / 3600);
    }

    public void updateCurrentValue(Food food, UserHistory userHistory, float weight) {
        float percent = weight / 100;
        if (userHistory.getCurrentCalories() == null) {
            userHistory.setCurrentCalories((float) 0);
            userHistory.setCurrentFat((float) 0);
            userHistory.setCurrentCarb((float) 0);
            userHistory.setCurrentProtein((float) 0);
        }
        userHistory.setCurrentCalories((float) (userHistory.getCurrentCalories() + percent * food.getCalories()));
        userHistory.setCurrentFat((float) (userHistory.getCurrentFat() + percent * food.getFat()));
        userHistory.setCurrentCarb((float) (userHistory.getCurrentCarb() + percent * food.getCarb()));
        userHistory.setCurrentProtein((float) (userHistory.getCurrentProtein() + percent * food.getProtein()));
    }

    public String createJsonStringFromSavedFood(Food food, float weight, int flag) {
        float percent = weight / 100;
        SavedFood savedFood = SavedFood.builder()
                .foodName(food.getName())
                .weight(weight)
                .calories((float) (percent * food.getCalories()))
                .carb((float) (percent * food.getCarb()))
                .fat((float) (percent * food.getFat()))
                .protein((float) (percent * food.getProtein()))
                .flag(flag)
                .build();
        return UtilsHandleJson.convertSavedFoodToString(savedFood);
    }

    public void updateCurrentValue(UserFood userFood, UserHistory userHistory, float weight) {
        float percent = weight / userFood.getWeight();
        if (userHistory.getCurrentCalories() == null) {
            userHistory.setCurrentCalories((float) 0);
            userHistory.setCurrentFat((float) 0);
            userHistory.setCurrentCarb((float) 0);
            userHistory.setCurrentProtein((float) 0);
        }
        userHistory.setCurrentCalories((float) (userHistory.getCurrentCalories() + percent * userFood.getCalories()));
        userHistory.setCurrentFat((float) (userHistory.getCurrentFat() + percent * userFood.getFat()));
        userHistory.setCurrentCarb((float) (userHistory.getCurrentCarb() + percent * userFood.getCarb()));
        userHistory.setCurrentProtein((float) (userHistory.getCurrentProtein() + percent * userFood.getProtein()));
    }

    public String createJsonStringFromSavedFood(UserFood food, float weight, int flag) {
        float percent = weight / food.getWeight();
        SavedFood savedFood = SavedFood.builder()
                .foodName(food.getUserFoodId().getUserFoodName())
                .weight(weight)
                .calories((float) (percent * food.getCalories()))
                .carb((float) (percent * food.getCarb()))
                .fat((float) (percent * food.getFat()))
                .protein((float) (percent * food.getProtein()))
                .flag(flag)
                .build();
        return UtilsHandleJson.convertSavedFoodToString(savedFood);
    }

    public ResponseFoodInMeal createResponseFoodInMeal(String json, int flagSystem, int flagMeal) {
        SavedFood savedFood = UtilsHandleJson.convertStringToSavedFood(json);
        if (savedFood.getFlag() != flagMeal) {
            return null;
        }
        return ResponseFoodInMeal.builder()
                .name(savedFood.getFoodName())
                .fat(savedFood.getFat())
                .carb(savedFood.getCarb())
                .protein(savedFood.getProtein())
                .calories(savedFood.getCalories())
                .weight(savedFood.getWeight())
                .flagSystem(flagSystem)
                .build();
    }

    public List<ResponseFoodInMeal> createListResponseFoodInMeal(List<String> system, List<String> user,
            int flagSystem) {
        List<ResponseFoodInMeal> list = new ArrayList<>();

        if (system != null && system.size() > 0) {
            for (int i = 0; i < system.size(); i++) {
                ResponseFoodInMeal responseFoodInMeal = createResponseFoodInMeal(system.get(i), 1, flagSystem);
                if (responseFoodInMeal != null) {
                    list.add(responseFoodInMeal);
                }
            }
        }

        if (user != null && user.size() > 0) {
            for (int i = 0; i < user.size(); i++) {
                ResponseFoodInMeal responseFoodInMeal = createResponseFoodInMeal(user.get(i), 2, flagSystem);
                if (responseFoodInMeal != null) {
                    list.add(responseFoodInMeal);
                }
            }
        }

        return list;
    }

    public void update(List<String> list, RequestUpdateFoodIn1Meal requestUpdateFoodIn1Meal, UserHistory userHistory) {
        for (int i = 0; i < list.size(); i++) {
            SavedFood savedFood = UtilsHandleJson.convertStringToSavedFood(list.get(i));
            if (savedFood.getCalories() == requestUpdateFoodIn1Meal.getOldCalories() &&
                    savedFood.getFoodName().equals(requestUpdateFoodIn1Meal.getOldName()) &&
                    savedFood.getWeight() == requestUpdateFoodIn1Meal.getOldWeight() &&
                    savedFood.getCarb() == requestUpdateFoodIn1Meal.getOldCarb() &&
                    savedFood.getFat() == requestUpdateFoodIn1Meal.getOldFat() &&
                    savedFood.getProtein() == requestUpdateFoodIn1Meal.getOldProtein() &&
                    savedFood.getFlag() == requestUpdateFoodIn1Meal.getFlagMeal()) {
                // create new savedfood
                SavedFood newSavedFood = createSavedFood(requestUpdateFoodIn1Meal);
                String json = UtilsHandleJson.convertSavedFoodToString(newSavedFood);
                // replace - update list json
                list.set(i, json);
                // update current value of user
                userHistory.setCurrentCalories(userHistory.getCurrentCalories()
                        - requestUpdateFoodIn1Meal.getOldCalories() + newSavedFood.getCalories());
                userHistory.setCurrentCarb(userHistory.getCurrentCarb()
                        - requestUpdateFoodIn1Meal.getOldCarb() + newSavedFood.getCarb());
                userHistory.setCurrentFat(userHistory.getCurrentFat()
                        - requestUpdateFoodIn1Meal.getOldFat() + newSavedFood.getFat());
                userHistory.setCurrentProtein(userHistory.getCurrentProtein()
                        - requestUpdateFoodIn1Meal.getOldProtein() + newSavedFood.getProtein());
                return;
            }
        }
    }

    public SavedFood createSavedFood(RequestUpdateFoodIn1Meal requestUpdateFoodIn1Meal) {
        SavedFood savedFood = new SavedFood();
        if (requestUpdateFoodIn1Meal.getFlagSystem() == 1) {
            float percent = requestUpdateFoodIn1Meal.getNewWeight() / requestUpdateFoodIn1Meal.getOldWeight();
            savedFood = SavedFood.builder()
                    .foodName(requestUpdateFoodIn1Meal.getNewName())
                    .weight(percent * requestUpdateFoodIn1Meal.getOldWeight())
                    .calories(percent * requestUpdateFoodIn1Meal.getOldCalories())
                    .carb(percent * requestUpdateFoodIn1Meal.getOldCarb())
                    .fat(percent * requestUpdateFoodIn1Meal.getOldFat())
                    .protein(percent * requestUpdateFoodIn1Meal.getOldProtein())
                    .flag(requestUpdateFoodIn1Meal.getFlagMeal())
                    .build();
        } else {
            savedFood = SavedFood.builder()
                    .foodName(requestUpdateFoodIn1Meal.getNewName())
                    .weight(requestUpdateFoodIn1Meal.getNewWeight())
                    .calories(requestUpdateFoodIn1Meal.getNewCalories())
                    .carb(requestUpdateFoodIn1Meal.getNewCarb())
                    .fat(requestUpdateFoodIn1Meal.getNewFat())
                    .protein(requestUpdateFoodIn1Meal.getNewProtein())
                    .flag(requestUpdateFoodIn1Meal.getFlagMeal())
                    .build();
        }
        return savedFood;
    }

    public void deleteFoodInJson(UserHistory userHistory, List<String> list,
            RequestDeleteFoodInMeal requestDeleteFoodInMeal) {
        for (int i = 0; i < list.size(); i++) {
            SavedFood savedFood = UtilsHandleJson.convertStringToSavedFood(list.get(i));
            if (savedFood.getCalories() == requestDeleteFoodInMeal.getCalories() &&
                    savedFood.getFoodName().equals(requestDeleteFoodInMeal.getName()) &&
                    savedFood.getWeight() == requestDeleteFoodInMeal.getWeight() &&
                    savedFood.getCarb() == requestDeleteFoodInMeal.getCarb() &&
                    savedFood.getFat() == requestDeleteFoodInMeal.getFat() &&
                    savedFood.getProtein() == requestDeleteFoodInMeal.getProtein() &&
                    savedFood.getFlag() == requestDeleteFoodInMeal.getFlagMeal()) {
                // create new savedfood
                SavedFood savedFood1 = createSavedFood(requestDeleteFoodInMeal);
                String json = UtilsHandleJson.convertSavedFoodToString(savedFood1);
                // remove
                list.remove(i);
                // update current value of user
                userHistory.setCurrentCalories(userHistory.getCurrentCalories()
                        - savedFood1.getCalories());
                userHistory.setCurrentCarb(userHistory.getCurrentCarb()
                        - savedFood1.getCarb());
                userHistory.setCurrentFat(userHistory.getCurrentFat()
                        - savedFood1.getFat());
                userHistory.setCurrentProtein(userHistory.getCurrentProtein()
                        - savedFood1.getProtein());
                return;
            }
        }
    }

    public SavedFood createSavedFood(RequestDeleteFoodInMeal requestDeleteFoodInMeal) {
        return SavedFood.builder()
                .foodName(requestDeleteFoodInMeal.getName())
                .weight(requestDeleteFoodInMeal.getWeight())
                .calories(requestDeleteFoodInMeal.getCalories())
                .carb(requestDeleteFoodInMeal.getCarb())
                .fat(requestDeleteFoodInMeal.getFat())
                .protein(requestDeleteFoodInMeal.getProtein())
                .flag(requestDeleteFoodInMeal.getFlagMeal())
                .build();
    }

    public ResponseNutritionProfile createResponseNutritionProfile(UserHistory userHistory) {
        // get userHistory
        DayMonthYear currentDayMonthYear = getCurrentDayMonthYear();
        if (userHistory.getUserHistoryId().getDay() != currentDayMonthYear.getDay() ||
                userHistory.getUserHistoryId().getMonth() != currentDayMonthYear.getMonth() ||
                userHistory.getUserHistoryId().getYear() != currentDayMonthYear.getYear()) {
            return ResponseNutritionProfile.builder()
                    .totalCalories(userHistory.getTotalCalories())
                    .totalFat(userHistory.getTotalFat())
                    .totalCarb(userHistory.getTotalCarb())
                    .totalProtein(userHistory.getTotalProtein())
                    .currentCalories(userHistory.getCurrentCalories())
                    .currentFat(userHistory.getCurrentFat())
                    .currentCarb(userHistory.getCurrentCarb())
                    .currentProtein(userHistory.getCurrentProtein())
                    .diet(userHistory.getFlagDiet())
                    .listFoodInMorning(createListFood(1, userHistory))
                    .listFoodInLunch(createListFood(2, userHistory))
                    .listFoodInAfternoon(createListFood(3, userHistory))
                    .listFoodInExtra(createListFood(4, userHistory))
                    .build();
        } else {
            return ResponseNutritionProfile.builder()
                    .totalCalories(userHistory.getTotalCalories())
                    .totalFat(userHistory.getTotalFat())
                    .totalCarb(userHistory.getTotalCarb())
                    .totalProtein(userHistory.getTotalProtein())
                    .currentCalories(userHistory.getCurrentCalories())
                    .currentFat(userHistory.getCurrentFat())
                    .currentCarb(userHistory.getCurrentCarb())
                    .currentProtein(userHistory.getCurrentProtein())
                    .diet(userHistory.getFlagDiet())
                    .build();
        }
    }

    public List<SavedFood> createListFood(int flagMeal, UserHistory userHistory) {
        List<SavedFood> result = new ArrayList<>();
        result.addAll(createListFood(flagMeal, userHistory.getListFoodInSystem()));
        result.addAll(createListFood(flagMeal, userHistory.getListUserFood()));
        return result;
    }

    public List<SavedFood> createListFood(int flagMeal, List<String> list) {
        List<SavedFood> result = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            SavedFood savedFood = UtilsHandleJson.convertStringToSavedFood(list.get(i));
            if (savedFood.getFlag() == flagMeal) {
                result.add(savedFood);
            }
        }
        return result;
    }

    public ResponseDateReport createResponseDateReport(UserHistory userHistory, float weight) {
        return ResponseDateReport.builder()
                // calories
                .totalCalories(userHistory.getTotalCalories())
                .currentCalories(userHistory.getCurrentCalories())
                .currentBurned(userHistory.getCurrentBurned())
                // fat
                .totalFat(userHistory.getTotalFat())
                .currentFat(userHistory.getCurrentFat())
                // protein
                .totalProtein(userHistory.getTotalProtein())
                .currentProtein(userHistory.getTotalProtein())
                // carb
                .totalCarb(userHistory.getTotalCarb())
                .currentCarb(userHistory.getCurrentCarb())
                // list exercise
                .listExerciseInReport(createListExercise(userHistory, weight))
                // list food
                .listSavedFoods(createListSavedFoods(userHistory))
                .build();
    }

    public List<ExerciseInReport> createListExercise(UserHistory userHistory, float weight) {
        List<ExerciseInReport> listExerciseInReports = new ArrayList<>();
        Map<String, Integer> map = userHistory.getExercisesFromExerciseJson();
        // iterate map
        for (String exerciseId : map.keySet()) {
            int numberOfSets = map.get(exerciseId);
            Excercise excercise = this.exerciseRepository.findById(exerciseId).get();
            // calculate calories
            float caloriesSet = (weight * excercise.getMet() * excercise.getTime()) / 3600;
            ExerciseInReport exerciseInReport = ExerciseInReport.builder()
                    .name(excercise.getName())
                    .numberOfSets(numberOfSets)
                    .met(excercise.getMet())
                    .timeSet(excercise.getTime())
                    .caloriesSet(caloriesSet)
                    .totalCalories(caloriesSet * numberOfSets)
                    .build();
            // add to list
            listExerciseInReports.add(exerciseInReport);
        }
        // return
        return listExerciseInReports;
    }

    public List<SavedFood> createListSavedFoods(UserHistory userHistory) {
        List<SavedFood> list = new ArrayList<>();

        if (userHistory.getListFoodInSystem() != null && userHistory.getListFoodInSystem().size() > 0) {
            for (int i = 0; i < userHistory.getListFoodInSystem().size(); i++) {
                SavedFood savedFood = UtilsHandleJson
                        .convertStringToSavedFood(userHistory.getListFoodInSystem().get(i));
                list.add(savedFood);
            }
        }

        if (userHistory.getListUserFood() != null && userHistory.getListUserFood().size() > 0) {
            for (int i = 0; i < userHistory.getListUserFood().size(); i++) {
                SavedFood savedFood = UtilsHandleJson
                        .convertStringToSavedFood(userHistory.getListUserFood().get(i));
                list.add(savedFood);
            }
        }

        return list;
    }

    public List<ResponseWeeklyReport> createResponseWeeklyReports(List<UserHistory> listUserHistories) {
        List<ResponseWeeklyReport> list = new ArrayList<>();
        // iterate listUserHistories
        for (int i = 0; i < listUserHistories.size(); i++) {
            ResponseWeeklyReport responseWeeklyReport = createResponseWeeklyReport(listUserHistories.get(i));
            list.add(responseWeeklyReport);
        }
        // return
        return list;
    }

    public ResponseWeeklyReport createResponseWeeklyReport(UserHistory userHistory) {
        return ResponseWeeklyReport.builder()
                // total
                .totalCalories(userHistory.getTotalCalories())
                .totalFat(userHistory.getTotalFat())
                .totalCarb(userHistory.getTotalCarb())
                .totalProtein(userHistory.getTotalProtein())
                // current
                .currentCalories(userHistory.getCurrentCalories())
                .currentFat(userHistory.getCurrentFat())
                .currentCarb(userHistory.getCurrentCarb())
                .currentProtein(userHistory.getCurrentProtein())
                // burned
                .currentBurned(userHistory.getCurrentBurned())
                // date
                .dayMonthYear(new DayMonthYear(userHistory.getUserHistoryId().getDay(),
                        userHistory.getUserHistoryId().getMonth(), userHistory.getUserHistoryId().getYear()))
                .build();
    }

    public ResponseYearReport createResponseYearReport(List<UserHistory> listUserHistories, int month, int year,
            String userId, float weight) {
        // create exerciseChart
        List<ExerciseChart> listExerciseCharts = new ArrayList<>();
        for (int i = 0; i < listUserHistories.size(); i++) {
            ExerciseChart exerciseChart = ExerciseChart.builder()
                    .day(listUserHistories.get(i).getUserHistoryId().getDay())
                    .currentBurned(listUserHistories.get(i).getCurrentBurned())
                    .build();
            listExerciseCharts.add(exerciseChart);
        }
        // create caloriesChart
        List<CaloriesChart> listCaloriesCharts = new ArrayList<>();
        for (int i = 0; i < listUserHistories.size(); i++) {
            CaloriesChart caloriesChart = CaloriesChart.builder()
                    .day(listUserHistories.get(i).getUserHistoryId().getDay())
                    .totalCalories(listUserHistories.get(i).getTotalCalories())
                    .currentCalories(listUserHistories.get(i).getCurrentCalories())
                    .build();
            listCaloriesCharts.add(caloriesChart);
        }
        // create fat carb protein chart
        List<FatCarbProteinChart> listFatCarbProteinCharts = new ArrayList<>();
        for (int i = 0; i < listUserHistories.size(); i++) {
            FatCarbProteinChart fatCarbProteinChart = FatCarbProteinChart.builder()
                    .day(listUserHistories.get(i).getUserHistoryId().getDay())
                    // total
                    .totalFat(listUserHistories.get(i).getTotalFat())
                    .totalCarb(listUserHistories.get(i).getTotalCarb())
                    .totalProtein(listUserHistories.get(i).getTotalProtein())
                    // current
                    .currentFat(listUserHistories.get(i).getCurrentFat())
                    .currentCarb(listUserHistories.get(i).getCurrentCarb())
                    .currentProtein(listUserHistories.get(i).getCurrentProtein())
                    .build();
            listFatCarbProteinCharts.add(fatCarbProteinChart);
        }
        return ResponseYearReport.builder()
                // chart
                .exerciseChart(listExerciseCharts)
                .caloriesChart(listCaloriesCharts)
                .fatCarbProteinChart(listFatCarbProteinCharts)
                // list exercise
                .listExercises(createLExerciseInReports(month, year, userId, weight))
                // list saved food in calories
                .listSavedFoodsCalories(createListFoodInCalories(month, year, userId))
                // list saved food fat
                .listSavedFoodFat(createListFoodInFatCarbProtein(month, year, userId, 1))
                // list saved food carb
                .listSavedFoodCarb(createListFoodInFatCarbProtein(month, year, userId, 2))
                // list saved food protein
                .listSavedFoodProtein(createListFoodInFatCarbProtein(month, year, userId, 3))
                .build();
    }

    public List<List<ExerciseInReport>> createLExerciseInReports(int month, int year, String userId, float weight) {
        List<List<ExerciseInReport>> list = new ArrayList<>();
        List<UserHistory> listUserHistories = this.userHistoryRepository.getListUserHistoriesBasedOnBurned(month, year,
                userId);
        for (int i = 0; i < listUserHistories.size(); i++) {
            List<ExerciseInReport> listExerciseInReports = createListExercise(listUserHistories.get(i), weight);
            list.add(listExerciseInReports);
        }

        return list;
    }

    public List<List<SavedFood>> createListFoodInCalories(int month, int year, String userId) {
        List<List<SavedFood>> list = new ArrayList<>();
        List<UserHistory> listUserHistories = this.userHistoryRepository.getListUserHistoriesBasedOnCalories(month,
                year,
                userId);
        for (int i = 0; i < listUserHistories.size(); i++) {
            List<SavedFood> listSavedFood = this.createListSavedFoods(listUserHistories.get(i));
            list.add(listSavedFood);
        }

        return list;
    }

    public List<List<SavedFood>> createListFoodInFatCarbProtein(int month, int year, String userId, int flag) {
        List<List<SavedFood>> list = new ArrayList<>();
        List<UserHistory> listUserHistories = new ArrayList<>();
        if (flag == 1) { // fat
            listUserHistories = this.userHistoryRepository.getListUserHistoriesBasedOnFat(month, year, userId);
        } else if (flag == 2) { // carb
            listUserHistories = this.userHistoryRepository.getListUserHistoriesBasedOnCarb(month, year, userId);
        } else { // protein
            listUserHistories = this.userHistoryRepository.getListUserHistoriesBasedOnProtein(month, year, userId);
        }

        for (int i = 0; i < listUserHistories.size(); i++) {
            List<SavedFood> listSavedFood = this.createListSavedFoods(listUserHistories.get(i));
            list.add(listSavedFood);
        }

        return list;
    }

}