package com.example.javaproject.repository;

import com.example.javaproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {


    Optional<User> findByUserName(String userName);

    Optional<User> findByUserNameOrEmailId(String userName, String emailId);


    Optional<List<User>> findByIsDeletedFalse();
}
