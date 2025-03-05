package com.example.javaproject.controller;

import com.example.javaproject.configuration.jwtconfigration.JwtHelper;
import com.example.javaproject.dto.UserDto;
import com.example.javaproject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/auth", produces = {MediaType.APPLICATION_JSON_VALUE})
public class AuthController {


    @Autowired private UserService userService;
    @GetMapping("/status")
    public ResponseEntity<?> checkLoginStatus(Authentication authentication) {
         UserDto byUserName = this.userService.findByUserName(authentication.getName());
        return ResponseEntity.status(HttpStatus.OK).body(byUserName);
    }
}