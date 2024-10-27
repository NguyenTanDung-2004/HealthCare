package com.example.DoAn1.utils;

import java.awt.*;
import java.awt.image.*;
import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;

public class RemoveBackground {

    public static void main(String[] args) throws IOException {
        // Load the image
        BufferedImage image = ImageIO.read(new File(
                "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Mon_hoc_UIT\\hocki5\\DoAn1\\Project\\Project1_NutritionAndExerciseRecommendationSystem\\DoAn1\\DoAn1\\src\\main\\resources\\static\\ExcerciseImages\\Ass\\Ass1\\1.png"));

        // Set color to be removed (e.g., white background)
        Color backgroundColor = Color.WHITE;

        // Call the method to remove the background
        BufferedImage result = removeBackground(image, backgroundColor);

        // Save the new image with transparent background
        ImageIO.write(result, "png", new File(
                "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Mon_hoc_UIT\\hocki5\\DoAn1\\Project\\Project1_NutritionAndExerciseRecommendationSystem\\DoAn1\\DoAn1\\src\\main\\resources\\abc.png"));
    }

    public static BufferedImage removeBackground(BufferedImage image, Color bgColor) {
        int width = image.getWidth();
        int height = image.getHeight();

        // Create a new image with an alpha channel (transparency)
        BufferedImage newImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);

        // Loop through each pixel in the original image
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                // Get the current pixel color
                int rgb = image.getRGB(x, y);
                Color currentColor = new Color(rgb);

                // Check if the pixel matches the background color
                if (isSimilarColor(currentColor, bgColor)) {
                    // Make the pixel transparent
                    newImage.setRGB(x, y, 0x00FFFFFF);
                } else {
                    // Keep the original pixel
                    newImage.setRGB(x, y, rgb);
                }
            }
        }
        return newImage;
    }

    // Helper method to compare colors (to account for minor differences)
    private static boolean isSimilarColor(Color c1, Color c2) {
        int threshold = 300; // Set the color similarity threshold
        int diffRed = Math.abs(c1.getRed() - c2.getRed());
        int diffGreen = Math.abs(c1.getGreen() - c2.getGreen());
        int diffBlue = Math.abs(c1.getBlue() - c2.getBlue());
        return (diffRed + diffGreen + diffBlue) < threshold;
    }
}
