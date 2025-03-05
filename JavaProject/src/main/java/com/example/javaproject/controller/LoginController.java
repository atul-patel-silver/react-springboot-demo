package com.example.javaproject.controller;


import com.example.javaproject.configuration.jwtconfigration.JwtHelper;
import com.example.javaproject.dto.LoginDto;
import com.example.javaproject.dto.LoginResponse;
import com.example.javaproject.exception.CredentialInvalidException;
import com.example.javaproject.exception.ResourceNotFoundException;
import com.example.javaproject.model.User;
import com.example.javaproject.repository.AnnouncementRepository;
import com.example.javaproject.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
//@CrossOrigin("*")
public class LoginController {

//    @Autowired
//    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    AnnouncementRepository announcementRepository;

    @Autowired
    private JwtHelper helper;

    @Autowired
    private UserDetailsService userDetailsService;

    private final Logger logger = LoggerFactory.getLogger(LoginController.class);


    @PostMapping({"/login","/signin"})
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginDto request, HttpServletResponse response) {
        this.doAuthenticate(request.getUserName(), request.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUserName());
        String token = this.helper.generateToken(userDetails);
        User user=userRepository.findByUserName(request.getUserName()).orElseThrow(
                () -> new ResourceNotFoundException("User", "UserName", String.valueOf(request.getUserName()))
        );
        Cookie jsessionidCookie = new Cookie("jwtToken", token);
        jsessionidCookie.setPath("/");  // Cookie available for all paths
        jsessionidCookie.setMaxAge(60 * 60);
        jsessionidCookie.setHttpOnly(true);
        /*jsessionidCookie.setSecure(false); // Change to true in HTTPS
        jsessionidCookie.setDomain("localhost"); // Set your domain
        jsessionidCookie.setAttribute("SameSite", "Lax");  // Use "None" for cross-origin
*/
        response.addCookie(jsessionidCookie);


        LoginResponse response2 = LoginResponse.builder()
                .isSuccess(true)
                .message("Login Successful")
                .role(user.getRoleName())
                .statusCode(HttpStatus.OK.toString()).build();

        return new ResponseEntity<>(response2, HttpStatus.OK);
    }


    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);

        } catch (BadCredentialsException e) {
            throw new CredentialInvalidException(e.getMessage());
        }

    }


    @GetMapping("/signout")
    public ResponseEntity<?> logout(HttpServletResponse response) {

        Cookie jsessionidCookie = new Cookie("jwtToken", null);
        jsessionidCookie.setPath("/");
        jsessionidCookie.setMaxAge(0);  // Set to expire immediately
        jsessionidCookie.setHttpOnly(true);  // Ensure this is consistent with how it was set
        response.addCookie(jsessionidCookie);

        LoginResponse response2 = LoginResponse.builder()
                .isSuccess(true)
                .message("Logout Successful")
                .statusCode(HttpStatus.OK.toString()).build();

        return ResponseEntity.ok(response2);
    }


    @GetMapping("/getAnnouncementList")
    public  ResponseEntity<?> getAnnouncementList(){
        return ResponseEntity.ok(this.announcementRepository.findAll());
    }

    @GetMapping("/getAnnouncement")
    public  ResponseEntity<?> getAnnouncementDetail(@RequestParam("id") Long id){
        return ResponseEntity.ok(this.announcementRepository.findById(id));
    }


}