package com.example.DoAn1.controller;

import java.io.File;
import java.text.Normalizer;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DoAn1.entities.Food;
import com.example.DoAn1.entities.user_history.UserHistory;
import com.example.DoAn1.entities.user_history.UserHistoryId;
import com.example.DoAn1.repository.FoodRepository;
import com.example.DoAn1.repository.UserHistoryRepository;
import com.example.DoAn1.service.UserService;
import com.example.DoAn1.utils.UtilsHandleEmail;
import com.example.DoAn1.utils.UtilsHandleJwtToken;
import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/test")
public class test {
    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private UserService userService;

    @Autowired
    private UtilsHandleEmail utilsHandleEmail;

    @Autowired
    private FoodRepository foodRepository;

    @PostMapping("/test")
    public ResponseEntity test() {
        System.out.println("nguyentandung");
        // List<Food> list = this.foodRepository.findAll();
        return ResponseEntity.ok().body("nguyentandung");
    }

    @PostMapping("/testAuthorization")
    public String abc() {
        System.out.println("nguyentandung");
        return "nguyentandung";
    }

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    @GetMapping("/getUserHistory")
    public ResponseEntity getUserHistory() {
        return ResponseEntity.ok().body(this.userHistoryRepository.findAll());
    }

    @PostMapping("/insertFoods")
    public ResponseEntity insertFoods() {
        UserHistoryId userHistoryId = UserHistoryId.builder()
                .userId("039446d3-259a-4a72-9531-63b8149ac976")
                .day(2)
                .month(10)
                .year(2024)
                .build();
        UserHistory userHistory = this.userHistoryRepository.findById(userHistoryId).get();
        System.out.println(userHistory);
        Map<String, Integer> map = userHistory.getExercises();
        map.put("asdfasdf", 5);
        userHistory.setExercises(map);
        this.userHistoryRepository.save(userHistory);
        return ResponseEntity.ok().body("asdfasdf");
    }

    public static void main(String args[]) {
        String[] s = { "Bài tập vai số 1",
                "Bài tập vai số 10",
                "Bài tập vai số 2",
                "Bài tập vai số 3",
                "Bài tập vai số 4",
                "Bài tập vai số 5",
                "Bài tập vai số 6",
                "Bài tập vai số 7",
                "Bài tập vai số 8",
                "Bài tập vai số 9" };
        String type = "start";
        File folder = new File(
                "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Mon_hoc_UIT\\hocki5\\DoAn1\\Project\\Project1_NutritionAndExerciseRecommendationSystem\\DoAn1\\DoAn1\\src\\main\\resources\\static\\ExcerciseImages\\"
                        + type);
        String path = "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Mon_hoc_UIT\\hocki5\\DoAn1\\Project\\Project1_NutritionAndExerciseRecommendationSystem\\DoAn1\\DoAn1\\src\\main\\resources\\static\\ExcerciseImages\\"
                + type;
        File[] listFolder = folder.listFiles();
        for (int i = 0; i < listFolder.length; i++) {
            System.out.println(listFolder[i].getName());
            File file = new File(listFolder[i].getAbsolutePath());
            File file1 = new File((path + File.separator + listFolder[i].getName() +
                    type).replace(type, ""));
            file.renameTo(file1);
            // File file = new File(listFolder[i].getAbsolutePath());
            // File file1 = new File(path + File.separator + test.convertToNoAccent(s[i]));
            // file.renameTo(file1);
        }
    }

    public static String convertToNoAccent(String str) {
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

}
