package com.example.javaproject.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserDto {

    private Long id;

    @NotBlank(message = "FirstName is required")
    @Size(min = 2, message = "FirstName must be at least 2 characters long")
    private String firstName;

    @NotBlank(message = "LastName is required")
    @Size(min = 2, message = "LastName must be at least 2 characters long")
    private String lastName;

    @NotBlank(message = "UserName is required")
    @Size(min = 6, message = "UserName must be at least 6 characters long")
    private String userName;

    @NotBlank(message = "Password is required")
    @Email(message = "Provide a Valid Email Address.")
    private String emailId;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    private String roleName;

}
