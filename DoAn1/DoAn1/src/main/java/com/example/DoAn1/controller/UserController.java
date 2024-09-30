package com.example.DoAn1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.DoAn1.entities.Food;
import com.example.DoAn1.repository.FoodRepository;
import com.example.DoAn1.request.UserCompleteRequest;
import com.example.DoAn1.request.UserCreationRequest;
import com.example.DoAn1.request.UserUpdatePasswordRequest;
import com.example.DoAn1.response.ResponseCode;
import com.example.DoAn1.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/SignUp")
    public ResponseEntity signUp(@RequestBody UserCreationRequest userCreationRequest,
            HttpServletResponse httpServletResponse) {
        System.out.println("nguyentandubng");
        return userService.signUp(userCreationRequest, httpServletResponse);
    }

    @PostMapping("/Complete")
    public ResponseEntity complete(@RequestBody UserCompleteRequest userCompleteRequest,
            HttpServletRequest httpServletRequest) {
        return this.userService.completeAccount(userCompleteRequest, httpServletRequest);
    }

    @PostMapping("/SendCodeUpdatePassword")
    public ResponseEntity sendCodeUpdatePassword(@RequestParam(name = "email") String email) {
        return this.userService.sendCode(email);
    }

    @PostMapping("/UpdatePassword")
    public ResponseEntity UpdatePassword(@RequestBody UserUpdatePasswordRequest userUpdatePasswordRequest) {
        return this.userService.updatePassword(userUpdatePasswordRequest);
    }

    @Autowired
    private FoodRepository foodRepository;

    @PostMapping("/Login")
    public ResponseEntity login(@RequestParam(name = "email") String email,
            @RequestParam(name = "password") String password, HttpServletResponse httpServletResponse) {
        List<Food> list = this.foodRepository.findAll();
        return ResponseEntity.ok().body(list);
        // return this.userService.login(password, email, httpServletResponse);
    }
}
