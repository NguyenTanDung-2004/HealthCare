package com.example.DoAn1.utils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.example.DoAn1.repository.ExerciseRepository;
import com.example.DoAn1.request.ExcerciseCreationRequest;

@Component
public class UtilsHandleFile {
    public static void main(String[] args) {
        UtilsHandleFile obj = new UtilsHandleFile();
        String pathOfStatic = obj.getPathOfStatic();
        Map<Integer, File> map = obj.createMapIndexFolder(pathOfStatic, "start");
        List<String> list = obj.createListImage(0, map, "start");
        System.out.println(list);
    }

    public Map<Integer, File> createMapIndexFolder(String relativePath, String type) {
        Map<Integer, File> map = new HashMap<>();

        File folder = new File(relativePath + File.separator + "ExcerciseImages" + File.separator + type);
        System.out.println(folder.isDirectory());

        File[] files = folder.listFiles();
        for (File file : files) {
            String folderName = file.getName();
            String trimedString = folderName.substring(type.length());
            int number = Integer.parseInt(trimedString);
            map.put(number, file);
        }

        return map;
    }

    public String getPathOfStatic() {
        ClassPathResource resource = new ClassPathResource("static/");

        File directory = null;
        try {
            directory = resource.getFile();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } // Lấy đối tượng File của thư mục
        return directory.getAbsolutePath();
    }

    public List<String> createListImage(int index, Map<Integer, File> map, String type) {
        List<String> list = new ArrayList<>();

        File folder = map.get(index + 1);

        File[] listFiles = folder.listFiles();
        for (File file : listFiles) {
            list.add("ExcerciseImages" + File.separator + type + File.separator + folder.getName() + File.separator
                    + file.getName());
        }

        return list;
    }
}
