// package com.example.DoAn1.configuration;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class WebConfig implements WebMvcConfigurer {

// @Override
// public void addCorsMappings(CorsRegistry registry) {
// registry.addMapping("/**") // Apply CORS to all endpoints
// .allowedOrigins("http://localhost:3000", "http://localhost:3000/account") //
// Allow only your frontend
// // URL
// .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow specific
// HTTP methods
// .allowedHeaders("*") // Allow all headers
// .allowCredentials(true); // Allow credentials (cookies, authorization
// headers, etc.)
// }
// }
