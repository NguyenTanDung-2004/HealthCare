package com.example.DoAn1.configuration;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.DoAn1.utils.UtilsHandleJwtToken;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Autowired
        private UtilsHandleJwtToken utilsHandleJwtToken;

        private final String[] GetPublicEnpoints = {

        };

        private final String[] PostPublicEnpoints = {
                        "/test/test",
                        "/user/SignUp",
                        "/user/Complete",
                        "/user/SendCodeUpdatePassword",
                        "/user/UpdatePassword",
                        "/user/Login",
                        "/food/createFood"
        };

        private final String[] PostAdmin = {
                        "/test/testAuthorization"
        };

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

                httpSecurity.authorizeHttpRequests(authorize -> authorize
                                .requestMatchers(HttpMethod.GET).permitAll()
                                .requestMatchers("/static/**").permitAll() // Allow access to static resources
                                .requestMatchers(HttpMethod.POST).permitAll()
                                .requestMatchers(HttpMethod.POST, PostAdmin).hasAuthority("SCOPE_ROLE_admin")
                                .anyRequest().authenticated());

                // Handle 401 Unauthorized responses
                httpSecurity.oauth2ResourceServer(oauth2 -> oauth2
                                .jwt(jwtConfigurer -> jwtConfigurer
                                                .decoder(this.utilsHandleJwtToken.jwtDecoder()))
                                .authenticationEntryPoint(new JwtTAuthenticationEntryPoint()))
                                // catch 403
                                .exceptionHandling()
                                .accessDeniedHandler(new JwtAuthorizationEntryPoint());
                ;

                // Disable CSRF protection
                httpSecurity.csrf(csrf -> csrf.disable());

                // // Allowed frontend can access
                httpSecurity.cors(cors -> cors.configurationSource(request -> {
                        CorsConfiguration corsConfig = new CorsConfiguration();
                        corsConfig.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                        // Adjust as
                        // necessary
                        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE",
                                        "OPTIONS"));
                        corsConfig.setAllowedHeaders(Collections.singletonList("*"));
                        corsConfig.setAllowCredentials(true);
                        return corsConfig;
                }));

                return httpSecurity.build();
        }

}
