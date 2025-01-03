package com.example.DoAn1.controller;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.DoAn1.request.RequestCreateUserTarget;
import com.example.DoAn1.service.UserTargetService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/userTarget")
public class UserTargetController {
    @Autowired
    private UserTargetService userTargetService;

    @PostMapping("/createUserTarget")
    public ResponseEntity createUserTarget(HttpServletRequest httpServletRequest,
            @RequestBody RequestCreateUserTarget requestCreateUserTarget) {
        return this.userTargetService.createUserTarget(httpServletRequest, requestCreateUserTarget);
    }

    @GetMapping("/getListUserTarget")
    public ResponseEntity getListUserTarget(HttpServletRequest httpServletRequest) {
        return this.userTargetService.getListUserTarget(httpServletRequest);
    }

    @GetMapping("/getUsertargetDetails")
    public ResponseEntity getUsertargetDetails(
            HttpServletRequest httpServletRequest,
            @RequestParam @DateTimeFormat(pattern = "yyyy-mm-dd") LocalDate start) {

        return this.userTargetService.getUsertargetDetails(httpServletRequest, start);
    }
}
