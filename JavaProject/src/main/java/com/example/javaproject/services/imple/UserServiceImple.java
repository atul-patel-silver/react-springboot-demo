package com.example.javaproject.services.imple;

import com.example.javaproject.configuration.CustomeUserDetail;
import com.example.javaproject.model.User;
import com.example.javaproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImple implements UserDetailsService {

    @Autowired
    private UserRepository  userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUserName(username).orElseThrow(
                () -> new UsernameNotFoundException("could Not Found !!! ")
        );

        return new CustomeUserDetail(user);
    }


}