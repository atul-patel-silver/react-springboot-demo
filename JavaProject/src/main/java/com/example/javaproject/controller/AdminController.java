package com.example.javaproject.controller;

import com.example.javaproject.dto.ResponseDto;
import com.example.javaproject.dto.UserDto;
import com.example.javaproject.model.User;
import com.example.javaproject.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/admin",produces = {MediaType.APPLICATION_JSON_VALUE})
//@CrossOrigin("*")
public class AdminController {


    @Autowired private UserService userService;


    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(Authentication authentication){
        UserDto byUserName = this.userService.findByUserName(authentication.getName());
        return ResponseEntity.status(HttpStatus.OK).body(byUserName);
    }


    @PostMapping("/registeruser")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto user) {
            this.userService.addUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDto(HttpStatus.CREATED, "SuccessFully Add User"));
    }

    @GetMapping("/getUserList")
    public ResponseEntity<?> getUserList(){
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.getUserList());
    }



}
