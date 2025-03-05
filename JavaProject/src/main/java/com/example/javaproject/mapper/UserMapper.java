package com.example.javaproject.mapper;


import com.example.javaproject.dto.UserDto;
import com.example.javaproject.model.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(UserDto userDto);
    UserDto toDto(User user);
    List<User> mapDtosToEntities(List<UserDto> dtos);
    List<UserDto> mapEntitiesToDtos(List<User> dtos);
}
