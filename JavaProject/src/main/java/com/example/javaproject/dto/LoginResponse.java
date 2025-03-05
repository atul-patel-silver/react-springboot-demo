package com.example.javaproject.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {

    private boolean isSuccess;

    private String message;


    private String statusCode;

    private String role;
}
