package com.example.javaproject.controller;

import com.example.javaproject.dto.UserDto;
import com.example.javaproject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user",produces = {MediaType.APPLICATION_JSON_VALUE})
public class UserController {


    @Autowired private UserService userService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(Authentication authentication){
         UserDto byUserName = this.userService.findByUserName(authentication.getName());
        return ResponseEntity.status(HttpStatus.OK).body(byUserName);
    }
}
