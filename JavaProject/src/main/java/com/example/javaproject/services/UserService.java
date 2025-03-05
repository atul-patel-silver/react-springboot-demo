package com.example.javaproject.services;

import com.example.javaproject.dto.UserDto;

import java.util.List;

public interface UserService {


    void addUser(UserDto userDto);
    List<UserDto> getUserList();

    UserDto findByUserName(String userName);
}
