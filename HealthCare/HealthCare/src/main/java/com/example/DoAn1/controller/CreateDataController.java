package com.example.DoAn1.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DoAn1.entities.Excercise;
import com.example.DoAn1.entities.Food;
import com.example.DoAn1.entities.status_food_excercise.StatusFoodExcerciseId;
import com.example.DoAn1.entities.status_food_excercise.UserStatus_Food_Excercise;
import com.example.DoAn1.repository.ExerciseRepository;
import com.example.DoAn1.repository.FoodRepository;
import com.example.DoAn1.repository.StatusFoodExcerciseRepository;
import com.example.DoAn1.request.RequestCreateData;

@RestController
@RequestMapping("/createDate")
public class CreateDataController {
    @Autowired
    private StatusFoodExcerciseRepository statusFoodExcerciseRepository;

    @PostMapping("/addExerciseIdInStatusTable")
    public String addExerciseIdInStatusTable(@RequestBody RequestCreateData requestCreateData) {
        // get list status_food_exercise from database
        List<UserStatus_Food_Excercise> list = this.statusFoodExcerciseRepository
                .listStatusExercise(requestCreateData.getList().size());
        for (int i = 0; i < requestCreateData.getList().size(); i++) {
            Set<String> set = list.get(i).getExcerciseId();
            if (set == null) {
                set = new HashSet<>();
            }
            for (String element : requestCreateData.getList().get(i)) {
                set.add(element);
            }
            // set
            list.get(i).setExcerciseId(set);
            // save
            this.statusFoodExcerciseRepository.save(list.get(i));
        }
        return "success";
    }

    @PostMapping("/addFoodIdInStatusTable")
    public String addFoodIdInStatusTable(@RequestBody RequestCreateData requestCreateData) {
        // get list status_food_exercise from database
        List<UserStatus_Food_Excercise> list = this.statusFoodExcerciseRepository
                .listStatusFood(requestCreateData.getList().size());
        for (int i = 0; i < requestCreateData.getList().size(); i++) {
            Set<String> set = list.get(i).getFoodId();
            if (set == null) {
                set = new HashSet<>();
            }
            for (String element : requestCreateData.getList().get(i)) {
                set.add(element);
            }
            // set
            list.get(i).setFoodId(set);
            // save
            this.statusFoodExcerciseRepository.save(list.get(i));
        }
        return "success";
    }

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private FoodRepository foodRepository;

    @GetMapping("")
    public ResponseEntity get() {
        // List<Excercise> list = exerciseRepository.findAll();
        // String s = "";
        // for (int i = 0; i < list.size(); i++) {
        // s = s + list.get(i).getId();
        // }
        String array[] = createArray(s);
        List<Set<String>> list = createList(array, 1000);
        Map<String, List<Set<String>>> map = new HashMap<>();
        map.put("list", list);
        return ResponseEntity.ok().body(map);
    }

    @GetMapping("/food")
    public ResponseEntity get1() {
        // List<Food> list = foodRepository.findAll();
        // String s = "";
        // for (int i = 0; i < list.size(); i++) {
        // s = s + list.get(i).getId();
        // }
        // return s;
        String array[] = createArray(sFood);
        List<Set<String>> list = createList(array, 1000);
        Map<String, List<Set<String>>> map = new HashMap<>();
        map.put("list", list);
        return ResponseEntity.ok().body(map);
    }

    // list exercise Id
    private static String s = "0cf7842c-1291-460b-817e-bd7c1c5a79e80d77abc7-ad7f-48a4-b951-75637daa674314f46f54-7d87-4fdb-af17-d2dd65f7a2532aebcbe4-0f2d-422c-83da-121fa16163472f2e3948-be5f-4bcb-9b1e-f775d717cb0d31e29943-f2b8-4bd3-aaba-78ebf7be39be3d106c16-960e-446d-977f-112ea5b46bd03ea6c4a6-0074-42aa-b291-6452f708082e3fa3777b-12e9-4539-bd2f-3356d78f74fb40e29981-10b9-4264-8676-1d03e5ee9c5147877738-5c86-42db-a9f2-54ee79cee9bc48743a5c-4c3f-4b61-9d55-0bfc818d05c948882ab8-1020-4c34-b7b3-c6b3d8b31ffd529c6b5e-7a46-411b-b328-62b84dae6ac95f9ca677-72d5-436d-a90f-252a67336fd263b3d962-44ac-46aa-a985-e88542c5b20068d54fa7-6110-4632-9937-bc5d4ba707a069a14f54-d9ec-4ef8-bb7a-7ce3ba2ab2856d0d9234-33a6-4295-ba85-a066c8dee40d6edf34e1-e84b-458e-8763-498f68da88bb78065336-d407-4045-99dc-1ff9a13f921d7f1b438c-647d-4f09-8ca3-f294aedaee6980f04b71-972d-4080-bc84-bd094dafcfc58611b699-bc9f-402c-b7bd-e1552d7def7488c005d6-d632-4039-a21a-9c440a5d79458a08c903-8db0-4541-95a8-e2c82975b21691713e03-416f-499a-a0c2-c188e67b83bb9b5b1b66-eed0-4e47-babf-cecee1649767a0e6fa20-34f4-4bf3-aa20-399f4ec3eaa7a1e4a407-5b33-4d27-b270-ebed8b4d460da24fec09-6b08-497b-a30e-77289e71ddc4a33611a9-0193-4391-ab02-ffa655cccc75a831fc76-093c-4271-835e-ec09b8510610a8cf222e-23aa-410e-be85-b7e2b57de295b1912655-88e4-42ca-ad60-1b65bdd0c6cfb1edee65-a9f7-4c78-bb7b-fc776e6be5f9bb070c0e-8fcf-4955-b934-cb3444645b36bd41e719-0078-402c-8020-f74b9f8ccb2bd8831ff9-14e0-4847-a794-601c8479608bd92851b4-517c-46d3-8e16-a96ae36c01eddea0c368-d0a8-4e10-b526-fa8bbee8ae97e32ce11e-d7f4-4b6b-a6cf-22981e1c646ce5d9782c-2e7e-4da3-bd0b-6f61e9cfb8e4e7c3d466-fbcd-4bdc-8779-ac12b29f92ade9f14ad8-f3e6-450a-afb2-93c6c8faf366eea6db76-9815-40bb-8090-a6a03d190009eec10f5c-8b4f-4545-943c-ad409f5be144ef9f197f-9049-4940-958c-e8ee37d3aa32fc13ceff-5a16-460b-91cc-1d9e69438168fcfa3e5e-3d5b-4a82-900d-93066d816d69";
    private static String sFood = "01e12cfa-d179-4d12-a426-3cb60b673840087f5106-a86d-4f23-b553-05dabcff438012bc868a-2019-4faf-806d-df70916c35e520814d11-1b6f-46bc-9a5f-90b99b15ad9f24dabc71-b788-4bc2-bed5-08b5ff3b49902a0a5ae4-157e-40d7-b370-4000d48c25b538d80012-4405-4762-832d-95c0ec706b913c973359-426a-48bb-858f-47843889fd474cb665cb-130d-413e-948f-d5ad56e71eca5d459f9c-f579-4260-b275-5c47fec28efd685d96d6-6f5c-4bc0-b74b-21446b63b60d6cc68b67-9c0e-4a23-bacb-5c12321072106ce0e85f-5c57-47b8-8560-206d8e1aa5cc6d7cb395-4efb-4368-96c2-f3a74d2709f06f242c7e-fe3a-47ab-a2e4-f47f24b5824f766e7c41-809a-4970-bb2e-5c056d99ce177c28cfd4-74f2-43bf-9b79-4cc39a7b491d7d04f05b-8671-460e-9f10-72c77735975f7ef314db-78b0-4a75-84a6-ae34b91aee4b8c7964e9-cc31-4484-bcbb-f3a37a1174868df6bc69-fa54-42ef-ac28-03ed1ee7d9b78e5f39ba-e6d0-4796-9312-e8962b61b5169775c58a-5f7a-4625-91a3-88d36b44db169b7924ae-a516-45be-b8db-354c91a5ab2d9d07c1a9-eca5-4f4a-9673-036b85d1703e9f9e56ab-0e22-4e59-9a50-eb23c03a42baa48d154a-fd2a-46e3-9671-34e71f4b9aeaa5c5e386-71eb-4e71-b07f-ce6c17723e5eb454cb5c-2ca8-4596-b8d4-1cf0f309dd37b503b7db-e66c-483f-bf1a-d6400db34527c37c97e5-f065-4021-92ae-5cae89892b29c429510d-b804-4a51-901e-db2b5c198eabc8cb4800-9851-4262-8891-a221c7175eb1ca9dfc83-a8ac-4ee6-9f4e-e89b30d3eb0bcd4e20ef-0032-45cd-b958-54c8fd6f7420d373d3e3-1254-4418-b5ca-3e7e8e6b9166d8cf98f5-0d4d-4644-8915-3b97eaaeb6f0d9d059ef-b2f9-4f3e-a069-6802db0cf33bef96128c-46f8-480a-bac7-91346caf2ba4f3f78fbd-310a-4079-b38b-72327943b082ff07a53e-6697-4b9b-8e49-c5c6a362e22f";

    public static String[] createArray(String s) {
        // create array
        String array[] = new String[s.length() / 36];
        int x = 1;
        String s1 = "";
        int index = 0;
        for (int i = 0; i < s.length(); i++) {
            s1 = s1 + s.charAt(i);
            if (x % 36 == 0) {
                array[index] = s1;
                s1 = "";
                index++;
            }
            x++;
        }
        return array;
    }

    public static Set<String> createSet(String[] array) {
        int n = array.length;
        Random random = new Random();
        Set<String> set = new HashSet<>();
        int count = 0;
        while (true) {
            int randomNumber = random.nextInt(n);
            System.out.println(randomNumber);
            int oldLength = set.size();
            set.add(array[randomNumber]);
            if (set.size() != oldLength) {
                count++;
            }
            if (count == 10) {
                break;
            }
        }
        return set;
    }

    public static List<Set<String>> createList(String[] array, int number) {
        List<Set<String>> list = new ArrayList<>();
        for (int i = 0; i < number; i++) {
            list.add(createSet(array));
        }
        return list;
    }
}
