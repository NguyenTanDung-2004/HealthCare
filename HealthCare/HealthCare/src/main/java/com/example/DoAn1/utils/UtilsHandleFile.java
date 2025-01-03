package com.example.DoAn1.utils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.DoAn1.repository.ExerciseRepository;
import com.example.DoAn1.request.ExcerciseCreationRequest;

@Component
public class UtilsHandleFile {
    // public static void main(String[] args) {
    // UtilsHandleFile obj = new UtilsHandleFile();
    // String pathOfStatic = obj.getPathOfStatic();
    // Map<Integer, File> map = obj.createMapIndexFolder(pathOfStatic, "start");
    // List<String> list = obj.createListImage(0, map, "start");
    // System.out.println(list);
    // }

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

    public static String getPathServer() {
        return "http://localhost:8080/DoAn1-0.0.1-SNAPSHOT/";
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
        System.out.println(directory.getAbsolutePath());
        return directory.getAbsolutePath();
        // return
        // "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Mon_hoc_UIT\\hocki5\\DoAn1\\Project\\Project1_NutritionAndExerciseRecommendationSystem\\DoAn1\\DoAn1\\src\\main\\resources\\static";
    }

    public static void main(String[] args) {
        UtilsHandleFile obj = new UtilsHandleFile();
        System.out.println(obj.getPathOfStatic());
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

    public void saveFile(MultipartFile file, String path, String fileName, int flag) {
        // flag 1 - remove, 2 - normal
        File directory = new File(path);
        // Save the file
        File savedFile = new File(directory, fileName);
        try {
            file.transferTo(savedFile);
        } catch (IllegalStateException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("File saved: " + savedFile.getAbsolutePath());
    }

    public void createFolder(String path, String folderName) {
        File folder = new File(path, folderName);
        if (folder.mkdir()) {

        } else {

        }
    }

    public void delete1Folder(String path, String folderName) {
        File folder = new File(path, folderName);
        if (folder.delete()) {
            System.out.println("delete");
        } else {
            System.out.println("delete fail");
        }
    }

    public void delete1File(String filePath) {
        File file = new File(filePath);
        if (file.delete()) {
            System.out.println("delete");
        } else {
            System.out.println("delete fail");
        }
    }

    public void renameFolder(String path, String oldName, String newName) {
        File oldFolder = new File(path, oldName);
        File newFolder = new File(path, newName);

        if (oldFolder.renameTo(newFolder)) {
            System.out.println("rename");
        } else {
            System.out.println("fail");
        }
    }

}
