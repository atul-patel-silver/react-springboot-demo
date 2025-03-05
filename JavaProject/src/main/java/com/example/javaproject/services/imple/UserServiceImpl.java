package com.example.javaproject.services.imple;

import com.example.javaproject.dto.UserDto;
import com.example.javaproject.exception.AlreadyExistsException;
import com.example.javaproject.exception.ResourceNotFoundException;
import com.example.javaproject.mapper.UserMapper;
import com.example.javaproject.model.User;
import com.example.javaproject.repository.UserRepository;
import com.example.javaproject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired private UserRepository userRepository;


    @Autowired private UserMapper userMapper;


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void addUser(UserDto userDto) {
        Optional<User> userName = this.userRepository.findByUserName(userDto.getUserName());

        if (userName.isPresent()){
            throw new AlreadyExistsException("User", "UserName", userDto.getUserName());
        }
            User entity = this.userMapper.toEntity(userDto);
            entity.setPassword(this.passwordEncoder.encode(entity.getPassword()));
            entity.setRoleName("ROLE_USER");
            this.userRepository.save(entity);


    }

    @Override
    public List<UserDto> getUserList() {
         Optional<List<User>> byDeleteIsFalse = this.userRepository.findByIsDeletedFalse();
         if (byDeleteIsFalse.isPresent()){
             return this.userMapper.mapEntitiesToDtos(byDeleteIsFalse.get());
         }else {
             return List.of();
         }
    }

    @Override
    public UserDto findByUserName(String userName) {
        final User user = this.userRepository.findByUserName(userName).orElseThrow(
                () -> new ResourceNotFoundException("User", "user name", userName)
        );

        return this.userMapper.toDto(user);
    }
}
